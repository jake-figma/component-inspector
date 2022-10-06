import { Adapter } from "./adapter";
import { FormatResult, FormatResultItem, FormatSettings } from "../shared";
import {
  SafeComponent,
  SafeProperty,
  SafePropertyDefinition,
  SafePropertyDefinitions,
  SafePropertyDefinitionMetaMap,
} from "./types";
import { capitalizedNameFromName, propertyNameFromKey } from "./utils";

export function format(adapter: Adapter): FormatResult {
  return {
    label: "Vue",
    items: [formatInstances(adapter), formatDefinitions(adapter)],
  };
}

function formatDefinitions(adapter: Adapter): FormatResultItem {
  const { definitions, metas } = adapter;
  const lines: string[] = [];
  Object.keys(definitions).forEach((key) => {
    const properties = definitions[key];
    const componentName = capitalizedNameFromName(metas[key].name);
    const interfaceName = `${componentName}Props`;
    const types: TypeDefinitionsObject = {};
    const interfaces: InterfaceDefinitionsObject = {};
    const interfaceLines = Object.keys(properties)
      .sort()
      .map((propName) =>
        formatInterfaceProperties(
          interfaceName,
          propName,
          types,
          properties[propName]
        )
      )
      .filter(Boolean);
    interfaces[key] = `interface ${interfaceName} { ${interfaceLines.join(
      " "
    )} }`;
    lines.push(
      [
        `/**`,
        ` * ${componentName}Component.vue setup <script />`,
        ` */`,
        "",
        ...Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
        "",
        ...Object.values(interfaces),
        "",
        formatComponentPropsFromDefinitionsAndMetas(key, properties, metas),
        "",
      ].join("\n")
    );
  });
  return { label: "Definitions", language: "tsx", lines, settings: [] };
}

function formatInstances(adapter: Adapter): FormatResultItem {
  const { components } = adapter;
  const lines = [
    Object.values(components)
      .map((component) => componentToJsxTypeString(component, adapter))
      .join("\n\n"),
  ];
  return {
    label: "Instances",
    language: "html",
    lines,
    settings: [],
  };
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
    return `${name}?: ${definition.defaultValue};`;
  } else if (definition.type === "INSTANCE_SWAP") {
    return `${name}?: Component;`;
  } else {
    return `${name}?: ${JSON.stringify(definition)};`;
  }
}

type InterfaceDefinitionsObject = { [k: string]: string };
type TypeDefinitionsObject = { [k: string]: string };

function componentToJsxTypeString(component: SafeComponent, adapter: Adapter) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];

  const textKey = Object.keys(component.properties).find(
    (key) => definitions[key].type === "TEXT"
  );
  const neverDefaultType = (key: string) =>
    definitions[key].type === "INSTANCE_SWAP" ||
    definitions[key].type === "TEXT" ||
    definitions[key].type === "NUMBER";
  const isNotDefaultValue = (key: string) =>
    definitions[key].defaultValue !== component.properties[key].value;

  const propertyKeys = Object.keys(component.properties).filter(
    (key) => neverDefaultType(key) || isNotDefaultValue(key)
  );

  const isVisibleKey = (key: string) => {
    const isToggledByBoolean = adapter.references.instances[key]?.visible;
    if (isToggledByBoolean) {
      const visible = adapter.references.instances[key]?.visible || "";
      return component.properties[visible]?.value;
    } else if (definitions[key].hidden) {
      return false;
    }
    return true;
  };

  const lines = propertyKeys
    .sort()
    .map((key: string) =>
      isVisibleKey(key) ? formatJsxProp(component.properties[key], key) : null
    )
    .filter(Boolean);
  const n = capitalizedNameFromName(meta.name);
  return `<${n}Component ${lines.join(" ")} />`;
}

function formatJsxProp(property: SafeProperty, name: string) {
  const clean = propertyNameFromKey(name);
  if (property.undefined) {
    return "";
  }
  if (property.type === "BOOLEAN" || property.type === "NUMBER") {
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
  metas: SafePropertyDefinitionMetaMap
): string {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  const propsName = `${capitalizedNameFromName(meta.name)}Props`;
  return `const props = withDefaults(defineProps<${propsName}>(), {
    ${keys
      .map((key) => formatDefinitionInputProperty(definitions[key]))
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
