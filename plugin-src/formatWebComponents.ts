import { Adapter } from "./adapter";
import {
  FormatLanguage,
  FormatResult,
  FormatResultItem,
  FormatSettings,
} from "../shared";
import {
  SafeProperty,
  SafePropertyDefinition,
  SafePropertyDefinitionMetaMap,
  SafePropertyDefinitions,
} from "./types";
import {
  capitalizedNameFromName,
  componentJsCommentFromMeta,
  hyphenatedNameFromName,
  propertyNameFromKey,
} from "./utils";
import {
  formatInstancesInstanceFromComponent,
  SlotKeysData,
  slotKeysFromDefinitions,
} from "./formatShared";

export function format(
  adapter: Adapter,
  instanceSettings: FormatSettings
): FormatResult {
  return {
    label: "Web Components",
    items: [
      formatInstances(adapter, instanceSettings),
      formatDefinitions(adapter),
    ],
  };
}

function formatDefinitions(adapter: Adapter): FormatResultItem {
  const { definitions, metas } = adapter;
  const code: { language: FormatLanguage; lines: string[] }[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    const slotKeysData = slotKeysFromDefinitions(definition, true);
    code.push({
      language: "ts",
      lines: [
        componentJsCommentFromMeta(metas[key]),
        formatDefinitionsVariantOptionTypes(metas[key].name, definition).join(
          "\n"
        ),
        ...formatDefinitionsComponentClass(
          key,
          definition,
          metas,
          slotKeysData
        ),
      ],
    });
    code.push({
      language: "html",
      lines: [
        `<!-- ${capitalizedNameFromName(metas[key].name)} Template -->`,
        "\n",
        ...formatDefinitionsTemplate(key, metas, slotKeysData),
      ],
    });
  });
  return {
    label: "Definitions",
    code,
    settings: [],
  };
}

function formatInstances(
  adapter: Adapter,
  settings: FormatSettings
): FormatResultItem {
  const [showDefaults, explicitBoolean] = settings.map((a) => Boolean(a[1]));
  const { components } = adapter;
  const lines: string[] = [];
  Object.values(components).forEach((component) =>
    lines.push(
      formatInstancesInstanceFromComponent(
        component,
        adapter,
        showDefaults,
        explicitBoolean,
        formatInstancesAttributeFromProperty,
        hyphenatedNameFromName,
        slotFormatter,
        {
          instanceSlot: true,
        }
      )
    )
  );
  return {
    label: "Instances",
    code: [
      {
        language: "html",
        lines,
      },
    ],
    settings,
    settingsKey: "instance",
  };
}

function slotFormatter(
  tag: string,
  key: string,
  _slotCount: number,
  _isDefault = false,
  value: string = ""
) {
  return `<${tag} slot="${propertyNameFromKey(key)}">${value}</${tag}>`;
}

function formatInstancesAttributeFromProperty(
  property: SafeProperty,
  name: string,
  explicitBoolean: boolean
) {
  if (property.undefined) {
    return "";
  }
  const clean = propertyNameFromKey(name);
  if (property.type === "BOOLEAN") {
    return explicitBoolean
      ? `${clean}="${property.value}"`
      : property.value
      ? `${clean}`
      : "";
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `${clean}="${capitalizedNameFromName(node.name)}"`
      : `${clean}="${property.value}"`;
  } else {
    return `${clean}="${property.value}"`;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
function formatDefinitionsTemplate(
  key: string,
  metas: SafePropertyDefinitionMetaMap,
  { slotKeys, slotTextKeys, hasOneTextProperty }: SlotKeysData
): string[] {
  const meta = metas[key];
  const hyphenatedName = hyphenatedNameFromName(meta.name);
  const templateContent = slotKeys.map((key) =>
    hasOneTextProperty && key === slotTextKeys[0]
      ? `  <slot></slot>`
      : `  <slot name="${propertyNameFromKey(key)}"></slot>`
  );
  return [
    `<template id="template-${hyphenatedName}">${templateContent.join(
      "\n"
    )}</template>`,
  ];
}

function formatDefinitionsComponentClass(
  key: string,
  definitions: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap,
  { slotKeys }: SlotKeysData
): string[] {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  const capitalizedName = capitalizedNameFromName(meta.name);
  const hyphenatedName = hyphenatedNameFromName(meta.name);
  return [
    `class ${capitalizedName} extends HTMLElement {`,
    keys
      .map((key) =>
        definitions[key].hidden || slotKeys.includes(key)
          ? null
          : formatDefinitionsInputProperty(meta.name, definitions[key])
      )
      .filter(Boolean)
      .join("\n"),
    `constructor() {`,
    `super();`,
    `this.attachShadow({ mode: "open" }).appendChild(document.getElementById("template-${hyphenatedName}").content.cloneNode(true));`,
    "}",
    `public static get observedAttributes(): string[] {
      return [${keys
        .filter((key) => !definitions[key].hidden && !slotKeys.includes(key))
        .map((key) => `'${propertyNameFromKey(key)}'`)
        .join(", ")}];
      }`,
    "}",
    `customElements.define("${hyphenatedName}", ${capitalizedName});`,
  ];
}

function formatDefinitionsInputProperty(
  componentName: string,
  definition: SafePropertyDefinition
): string {
  const { name, type, defaultValue, optional } = definition;
  const clean = propertyNameFromKey(name);
  if (type === "BOOLEAN") {
    return `public ${clean}?: boolean = ${defaultValue};`;
  } else if (type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(defaultValue);
    const value = node
      ? node.name === "undefined"
        ? ""
        : ` = "${capitalizedNameFromName(node.name)}";`
      : ` = "${defaultValue}"`;
    return node
      ? `public ${clean}?: HTMLElement${value};`
      : `public ${clean}?: string${value};`;
  } else if (type === "NUMBER") {
    return `public ${clean}?: number  = ${defaultValue};`;
  } else if (type === "VARIANT") {
    return `public ${clean}?: ${typeNameForComponentProperty(
      componentName,
      name
    )}${
      optional && defaultValue === "undefined" ? "" : ` = "${defaultValue}";`
    }`;
  } else {
    return `public ${clean}?: string  = "${defaultValue}";`;
  }
}

function formatDefinitionsVariantOptionTypes(
  componentName: string,
  definitions: SafePropertyDefinitions
): string[] {
  const types: string[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    if (definition.type === "VARIANT") {
      types.push(
        `type ${typeNameForComponentProperty(
          componentName,
          definition.name
        )} = ${definition.variantOptions.map((o) => `'${o}'`).join(" | ")}`
      );
    }
  });
  return types;
}

function typeNameForComponentProperty(componentName: string, name: string) {
  return `${capitalizedNameFromName(componentName)}${capitalizedNameFromName(
    name
  )}`;
}
