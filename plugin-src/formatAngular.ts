import { Adapter } from "./adapter";
import { FormatResult, FormatResultItem, FormatSettings } from "../shared";
import {
  SafeProperty,
  SafePropertyDefinition,
  SafePropertyDefinitionMetaMap,
  SafePropertyDefinitions,
} from "./types";
import {
  capitalizedNameFromName,
  hyphenatedNameFromName,
  propertyNameFromKey,
} from "./utils";
import { formatInstancesInstanceFromComponent } from "./formatShared";

export function format(
  adapter: Adapter,
  instanceSettings: FormatSettings
): FormatResult {
  return {
    label: "Angular",
    items: [
      formatInstances(adapter, instanceSettings),
      formatDefinitions(adapter),
    ],
  };
}

function formatDefinitions(adapter: Adapter): FormatResultItem {
  const { definitions, metas } = adapter;
  const lines: string[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    lines.push(
      [
        `/**`,
        ` * ${capitalizedNameFromName(metas[key].name)} Component`,
        ` */`,
      ].join("\n"),
      formatDefinitionsVariantOptionTypes(metas[key].name, definition).join(
        "\n"
      ),
      ...formatDefinitionsComponentClass(key, definition, metas)
    );
  });
  return {
    label: "Definitions",
    language: "ts",
    lines,
    settings: [],
  };
}

function slotFormatter(
  tag: string,
  key: string,
  slotCount: number,
  isDefault = false,
  value: string = ""
) {
  const tagged = `<${tag} ${propertyNameFromKey(key)}>${value}</${tag}>`;
  return (isDefault || slotCount === 1) && value ? value : tagged;
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
    language: "angular",
    lines,
    settings,
    settingsKey: "instance",
  };
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
      ? `[${clean}]="${property.value}"`
      : property.value
      ? `[${clean}]`
      : "";
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `[${clean}]="${capitalizedNameFromName(node.name)}"`
      : `[${clean}]="${property.value}"`;
  } else {
    return `[${clean}]="${property.value}"`;
  }
}

function formatDefinitionsComponentClass(
  key: string,
  definitions: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap
): string[] {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  return [
    `@Component({ selector: '${hyphenatedNameFromName(meta.name)}' })`,
    `class ${capitalizedNameFromName(meta.name)} {`,
    keys
      .map((key) =>
        definitions[key].hidden
          ? null
          : formatDefinitionsInputProperty(meta.name, definitions[key])
      )
      .filter(Boolean)
      .join("\n"),
    "}",
  ];
}

function formatDefinitionsInputProperty(
  componentName: string,
  definition: SafePropertyDefinition
): string {
  const { name, type, defaultValue, optional } = definition;
  const clean = propertyNameFromKey(name);
  if (type === "BOOLEAN") {
    return `@Input() ${clean}?: boolean = ${defaultValue};`;
  } else if (type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(defaultValue);
    const value = node
      ? node.name === "undefined"
        ? ""
        : ` = "${capitalizedNameFromName(node.name)}";`
      : ` = "${defaultValue}"`;
    return node
      ? `@Input() ${clean}?: Component${value};`
      : `@Input() ${clean}?: string${value};`;
  } else if (type === "NUMBER") {
    return `@Input() ${clean}?: number = ${defaultValue};`;
  } else if (type === "VARIANT") {
    return `@Input() ${clean}?: ${typeNameForComponentProperty(
      componentName,
      name
    )}${
      optional && defaultValue === "undefined" ? "" : ` = "${defaultValue}";`
    }`;
  } else {
    return `@Input() ${clean}?: string  = "${defaultValue}";`;
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
