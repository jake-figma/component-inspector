import { Adapter } from "./adapter";
import { FormatResult, FormatResultItem, FormatSettings } from "../shared";
import {
  SafeComponent,
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

export function format(adapter: Adapter): FormatResult {
  return {
    label: "Angular",
    items: [formatInstances(adapter), formatDefinitions(adapter)],
  };
}

function formatDefinitions(adapter: Adapter): FormatResultItem {
  const { definitions, metas } = adapter;
  const types: string[] = [];
  const components: string[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    types.push(
      ...variantOptionTypesFromDefinitions(metas[key].name, definition)
    );
    components.push(
      ...formatComponentClassFromDefinitionsAndMetas(key, definition, metas)
    );
  });
  const lines = [...types.sort(), ...components];
  return {
    label: "Definitions",
    language: "ts",
    lines,
    settings: [],
  };
}

function formatInstances(adapter: Adapter): FormatResultItem {
  const { components } = adapter;
  const lines: string[] = [];
  Object.values(components).forEach((component) =>
    lines.push(formatInstanceFromComponent(component, adapter))
  );
  return {
    label: "Instances",
    language: "html",
    lines,
    settings: [],
  };
}

function formatInstanceFromComponent(
  component: SafeComponent,
  adapter: Adapter
) {
  const meta = adapter.metas[component.definition];
  const propertyKeys = Object.keys(component.properties);
  const lines = propertyKeys
    .sort()
    .map((key: string) =>
      adapter.definitions[component.definition][key].hidden
        ? null
        : formatInstanceAttributeFromProperty(component.properties[key], key)
    )
    .filter(Boolean);
  const n = hyphenatedNameFromName(meta.name);
  return `<${n} ${lines.join(" ")}></${n}>\n`;
}

function formatInstanceAttributeFromProperty(
  property: SafeProperty,
  name: string
) {
  if (property.undefined) {
    return "";
  }
  const clean = propertyNameFromKey(name);
  if (property.type === "BOOLEAN") {
    return `[${clean}]="${property.value}"`;
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `[${clean}]="${capitalizedNameFromName(node.name)}"`
      : `[${clean}]="${property.value}"`;
  } else {
    return `[${clean}]="${property.value}"`;
  }
}

function formatComponentClassFromDefinitionsAndMetas(
  key: string,
  definitions: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap
): string[] {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  return [
    `@Component({ selector: '${hyphenatedNameFromName(meta.name)}' })`,
    `class ${capitalizedNameFromName(meta.name)}Component {`,
    keys
      .map((key) =>
        definitions[key].hidden
          ? null
          : formatDefinitionInputProperty(meta.name, definitions[key])
      )
      .filter(Boolean)
      .join("\n"),
    "}",
  ];
}

function formatDefinitionInputProperty(
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

function typeNameForComponentProperty(componentName: string, name: string) {
  return `${capitalizedNameFromName(componentName)}${capitalizedNameFromName(
    name
  )}`;
}

function variantOptionTypesFromDefinitions(
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
