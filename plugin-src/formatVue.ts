import { Adapter } from "./adapter";
import {
  FormatLanguage,
  FormatResult,
  FormatResultItem,
  FormatSettingsOptions,
} from "../shared";
import {
  SafeProperty,
  SafePropertyDefinition,
  SafePropertyDefinitions,
  SafePropertyDefinitionMetaMap,
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
  definitionSettings?: FormatSettingsOptions,
  instanceSettings?: FormatSettingsOptions
): FormatResult {
  return {
    label: "Vue",
    items: [
      formatInstances(adapter, instanceSettings),
      formatDefinitions(adapter, definitionSettings),
    ],
  };
}

function formatDefinitions(
  adapter: Adapter,
  settings: FormatSettingsOptions = []
): FormatResultItem {
  const { definitions, metas } = adapter;
  const [isOptionsApi] = settings.map((a) => Boolean(a[1]));
  const code: { language: FormatLanguage; lines: string[] }[] = [];
  const hasDefinitions = Object.keys(definitions).length;
  if (hasDefinitions) {
    if (isOptionsApi) {
      code.push({
        language: "ts",
        lines: ["import { defineComponent, type PropType } from 'vue'"],
      });
    } else {
      code.push({
        language: "ts",
        lines: ["import { defineProps, withDefaults } from 'vue'"],
      });
    }
  }

  Object.keys(definitions).forEach((key) => {
    const properties = definitions[key];
    const slotKeysData = slotKeysFromDefinitions(properties, true);
    code.push({
      language: "tsx",
      lines: [
        isOptionsApi
          ? formatDefinitionsLineForOptionsAPI(
              key,
              properties,
              metas,
              slotKeysData
            )
          : formatDefinitionsLineForCompositionAPI(
              key,
              properties,
              metas,
              slotKeysData
            ),
      ],
    });
    code.push({
      language: "html",
      lines: formatDefinitionsTemplate(key, metas, slotKeysData),
    });
  });
  return {
    label: "Definitions",
    code,
    settings,
    settingsKey: "definitionVue",
  };
}

function formatInstances(
  adapter: Adapter,
  settings: FormatSettingsOptions = []
): FormatResultItem {
  const [showDefaults, explicitBoolean] = settings.map((a) => Boolean(a[1]));
  const { components } = adapter;
  const lines = [
    Object.values(components)
      .map((component) =>
        formatInstancesInstanceFromComponent(
          component,
          adapter,
          showDefaults,
          explicitBoolean,
          formatInstancesAttributeFromProperty,
          capitalizedNameFromName,
          slotFormatter,
          {
            selfClosing: true,
            instanceSlot: true,
          }
        )
      )
      .join("\n\n"),
  ];
  return {
    label: "Instances",
    code: [
      {
        language: "vue",
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
  slotCount: number,
  isDefault = false,
  value: string = ""
) {
  const tagged = value ? `<${tag}>${value}</${tag}>` : `<${tag} />`;
  if (slotCount > 1 && !isDefault) {
    return `<template v-slot:${propertyNameFromKey(key)}>
    ${tagged}
  </template>`;
  }
  return isDefault ? value : tagged;
}

function formatInterfaceProperties(
  interfaceName: string,
  propName: string,
  types: TypeDefinitionsObject,
  definition: SafePropertyDefinition
) {
  const name = propertyNameFromKey(propName);
  if (definition.hidden) {
    return "";
  }
  if (definition.type === "BOOLEAN") {
    return `${name}?: boolean;`;
  } else if (definition.type === "NUMBER") {
    return `${name}?: number;`;
  } else if (definition.type === "TEXT") {
    return `${name}?: string;`;
  } else if (definition.type === "VARIANT") {
    const n = `${interfaceName}${capitalizedNameFromName(propName)}`;
    const value = (definition.variantOptions || [])
      .map((o) => `'${o}'`)
      .join(" | ");
    types[n] = value;
    return `${name}?: ${n};`;
  } else if (definition.type === "EXPLICIT") {
    return `${name}?: "${definition.defaultValue}";`;
  } else if (definition.type === "INSTANCE_SWAP") {
    return `${name}?: Component;`;
  } else {
    return `${name}?: ${JSON.stringify(definition)};`;
  }
}

// https://vuejs.org/guide/components/slots.html#named-slots
function formatDefinitionsTemplate(
  key: string,
  metas: SafePropertyDefinitionMetaMap,
  { slotKeys, slotTextKeys, hasOneTextProperty }: SlotKeysData
) {
  const meta = metas[key];
  const template = slotKeys.map((key) =>
    hasOneTextProperty && key === slotTextKeys[0]
      ? `    <slot></slot>`
      : `    <slot name="${propertyNameFromKey(key)}"></slot>`
  );

  return [
    `<!-- ${capitalizedNameFromName(meta.name)} Template -->`,
    "\n",
    `<div id="template-${hyphenatedNameFromName(meta.name)}">`,
    ...template,
    "</div>",
  ];
}

function formatDefinitionsLineForCompositionAPI(
  key: string,
  properties: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap,
  slotKeysData: SlotKeysData
) {
  const componentName = capitalizedNameFromName(metas[key].name);
  const interfaceName = `${componentName}Props`;
  const types: TypeDefinitionsObject = {};
  const interfaceLines = Object.keys(properties)
    .sort()
    .map((propName) =>
      slotKeysData.slotKeys.includes(propName)
        ? null
        : formatInterfaceProperties(
            interfaceName,
            propName,
            types,
            properties[propName]
          )
    )
    .filter(Boolean);
  return [
    componentJsCommentFromMeta(metas[key], " .vue setup"),
    "",
    ...Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
    "",
    `interface ${interfaceName} { ${interfaceLines.join(" ")} }`,
    "",
    formatComponentPropsFromDefinitionsAndMetas(
      key,
      properties,
      metas,
      slotKeysData
    ),
    "",
  ].join("\n");
}

function formatDefinitionsLineForOptionsAPI(
  key: string,
  properties: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap,
  { slotKeys }: SlotKeysData
) {
  const types: TypeDefinitionsObject = {};
  const componentName = capitalizedNameFromName(metas[key].name);
  const propsLines = Object.keys(properties)
    .sort()
    .map((propName) =>
      slotKeys.includes(propName)
        ? null
        : formatDefinitionsOptionsProperties(
            componentName,
            propName,
            types,
            properties[propName]
          )
    )
    .filter(Boolean);
  const propsDefinition = [
    `const props${componentName} = {`,
    propsLines.join("\n"),
    `}`,
  ];
  return [
    componentJsCommentFromMeta(metas[key]),
    "",
    ...Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
    "",
    propsDefinition.join("\n"),
    "",
    "defineComponent({",
    `name: "${componentName}",`,
    `props: props${componentName}`,
    `})`,
  ].join("\n");
}

function formatDefinitionsOptionsProperties(
  componentName: string,
  propName: string,
  types: TypeDefinitionsObject,
  definition: SafePropertyDefinition
) {
  const { name, type, defaultValue, optional } = definition;
  if (definition.hidden) {
    return "";
  }
  const clean = propertyNameFromKey(name);
  if (type === "BOOLEAN") {
    return `${clean}: {
      type: Boolean,
      default: ${defaultValue},
    },`;
  } else if (type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(defaultValue);
    const value = node
      ? node.name === "undefined"
        ? ""
        : `default: "${capitalizedNameFromName(node.name)}";`
      : `default: "${defaultValue}"`;
    return `${clean}: {
        type: ${node ? "Object" : "String"},
        ${value}
      },`;
  } else if (type === "NUMBER") {
    return `${clean}: {
      type: Number,
      default: ${defaultValue},
    },`;
  } else if (type === "VARIANT") {
    const n = `${componentName}${capitalizedNameFromName(propName)}`;
    const value = (definition.variantOptions || [])
      .map((o) => `'${o}'`)
      .join(" | ");
    types[n] = value;
    return `${clean}: {
      type: Object as PropType<${n}>,
      ${
        optional && defaultValue === "undefined"
          ? ""
          : `default: "${defaultValue}",`
      } 
    },`;
  } else {
    return `${clean}: {
      type: String,
      default: "${defaultValue}",
    },`;
  }
}

type TypeDefinitionsObject = { [k: string]: string };

function formatInstancesAttributeFromProperty(
  property: SafeProperty,
  name: string,
  explicitBoolean: boolean
) {
  const clean = propertyNameFromKey(name);
  if (property.undefined) {
    return "";
  }
  if (property.type === "BOOLEAN") {
    return explicitBoolean
      ? `:${clean}="${property.value}"`
      : property.value
      ? clean
      : "";
  } else if (property.type === "NUMBER") {
    return `:${clean}="${property.value}"`;
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `:${clean}="${capitalizedNameFromName(node.name)}"`
      : `:${clean}="${property.value}"`;
  } else {
    return `${clean}="${property.value}"`;
  }
}

function formatComponentPropsFromDefinitionsAndMetas(
  key: string,
  definitions: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap,
  { slotKeys }: SlotKeysData
): string {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  const propsName = `${capitalizedNameFromName(meta.name)}Props`;
  return `withDefaults(defineProps<${propsName}>(), {
    ${keys
      .map((key) =>
        slotKeys.includes(key)
          ? null
          : formatDefinitionInputProperty(definitions[key])
      )
      .filter(Boolean)
      .join("\n")}
  })`;
}

function formatDefinitionInputProperty(
  definition: SafePropertyDefinition
): string {
  const { name, type, defaultValue } = definition;
  const clean = propertyNameFromKey(name);
  if (definition.hidden) {
    return "";
  }
  if (definition.optional && defaultValue === "undefined") {
    return `${clean},`;
  }
  if (type === "BOOLEAN") {
    return `${clean}: ${defaultValue},`;
  } else if (type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(defaultValue);
    if (definition.optional && node?.name === "undefined") {
      return `${clean},`;
    }
    return node
      ? `${clean}: <${capitalizedNameFromName(node.name)} />,`
      : `${clean}: "${defaultValue}",`;
  } else if (type === "NUMBER") {
    return `${clean}: ${defaultValue},`;
  } else if (type === "VARIANT") {
    return `${clean}: "${defaultValue}",`;
  } else {
    return `${clean}: "${defaultValue}",`;
  }
}
