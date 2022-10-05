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

export function format(
  adapter: Adapter,
  instanceSettings?: FormatSettings
): FormatResult {
  return {
    label: "React",
    items: [
      formatInstances(adapter, instanceSettings),
      formatDefinitions(adapter),
    ],
  };
}

function formatDefinitions(adapter: Adapter): FormatResultItem {
  const { definitions, metas } = adapter;
  const types: TypeDefinitionsObject = {};
  const interfaces: InterfaceDefinitionsObject = {};
  const componentDefinitionFunctions: string[] = [];
  Object.keys(definitions).forEach((key) => {
    const properties = definitions[key];
    const interfaceName = `${capitalizedNameFromName(metas[key].name)}Props`;
    const lines = Object.keys(properties)
      .sort()
      .map((propName) =>
        formatInterfaceProperties(
          interfaceName,
          propName,
          types,
          properties[propName]
        )
      );
    interfaces[key] = `interface ${interfaceName} { ${lines.join(" ")} }`;
    componentDefinitionFunctions.push(
      formatComponentFunctionFromDefinitionsAndMetas(key, properties, metas)
    );
  });
  const lines = [
    ...Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
    ...Object.values(interfaces),
    ...componentDefinitionFunctions,
  ];
  return { label: "Definitions", language: "tsx", lines, settings: [] };
}

function formatInstances(
  adapter: Adapter,
  settings: FormatSettings = []
): FormatResultItem {
  const { components } = adapter;
  const [showDefaults, explicitBoolean, findText] = settings.map((a) =>
    Boolean(a[1])
  );
  const lines = Object.values(components).map((component) =>
    componentToJsxTypeString(
      component,
      adapter,
      showDefaults,
      explicitBoolean,
      findText
    )
  );
  return {
    label: "Instances",
    language: "jsx",
    lines,
    settings,
    settingsKey: "reactInstance",
  };
}

function formatInterfaceProperties(
  interfaceName: string,
  propName: string,
  types: TypeDefinitionsObject,
  definition: SafePropertyDefinition
) {
  const name = propertyNameFromKey(propName);
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
    return `${name}?: React.ReactNode;`;
  } else {
    return `${name}?: ${JSON.stringify(definition)};`;
  }
}

type InterfaceDefinitionsObject = { [k: string]: string };
type TypeDefinitionsObject = { [k: string]: string };

function componentToJsxTypeString(
  component: SafeComponent,
  adapter: Adapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  findText: boolean
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];

  const textKey = Object.keys(component.properties).find(
    (key) => definitions[key].type === "TEXT"
  );
  const children: string | null =
    findText && textKey
      ? `${component.properties[textKey].value}` || null
      : null;

  const neverDefaultType = (key: string) =>
    definitions[key].type === "INSTANCE_SWAP" ||
    definitions[key].type === "TEXT" ||
    definitions[key].type === "NUMBER";
  const isNotDefaultValue = (key: string) =>
    definitions[key].defaultValue !== component.properties[key].value;
  const notTextChildrenKey = (key: string) => !children || key !== textKey;

  const propertyKeys = Object.keys(component.properties).filter(
    (key) =>
      (showDefaults || neverDefaultType(key) || isNotDefaultValue(key)) &&
      notTextChildrenKey(key)
  );

  const isReferenceChecked = (name: string) => {
    const key = adapter.references.instances[name]?.visible;
    if (!key) {
      return true;
    }
    const visible = adapter.references.instances[name]?.visible || "";
    return component.properties[visible]?.value;
  };

  const lines = propertyKeys
    .sort()
    .map((key: string) =>
      isReferenceChecked(key)
        ? formatJsxProp(component.properties[key], key, explicitBoolean)
        : null
    )
    .filter(Boolean);
  const n = capitalizedNameFromName(meta.name);
  return `<${n} ${lines.join(" ")} ${children ? `>${children}</${n}>` : `/>`}`;
}

function formatJsxProp(
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
      ? `${clean}={${property.value}}`
      : property.value
      ? clean
      : "";
  } else if (property.type === "NUMBER") {
    return `${clean}={${property.value}}`;
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `${clean}={<${capitalizedNameFromName(node.name)} />}`
      : `${clean}="${property.value}"`;
  } else {
    return `${clean}="${property.value}"`;
  }
}

function formatComponentFunctionFromDefinitionsAndMetas(
  key: string,
  definitions: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap
): string {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  const destructuredProps = `{
    ${keys
      .map((key) => formatDefinitionInputProperty(definitions[key]))
      .join("\n")}
  }`;
  const propsName = `${capitalizedNameFromName(metas[key].name)}Props`;
  return `const ${capitalizedNameFromName(
    meta.name
  )}: React.FC<${propsName}> = (${destructuredProps}) => {}`;
}

function formatDefinitionInputProperty(
  definition: SafePropertyDefinition
): string {
  const { name, type, defaultValue } = definition;
  const clean = propertyNameFromKey(name);
  if (definition.optional && defaultValue === "undefined") {
    return `${clean},`;
  }
  if (type === "BOOLEAN") {
    return `${clean} = ${defaultValue},`;
  } else if (type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(defaultValue);
    if (definition.optional && node?.name === "undefined") {
      return `${clean},`;
    }
    return node
      ? `${clean} = <${capitalizedNameFromName(node.name)} />,`
      : `${clean} = "${defaultValue}",`;
  } else if (type === "NUMBER") {
    return `${clean}  = ${defaultValue},`;
  } else if (type === "VARIANT") {
    return `${clean} = "${defaultValue}",`;
  } else {
    return `${clean} = "${defaultValue}",`;
  }
}
