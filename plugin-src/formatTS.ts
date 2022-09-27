import { Adapter } from "./adapter";
import { FormatResult, FormatSettings } from "../shared";
import { SafePropertyDefinition } from "./types";
import { componentNameFromName, propertyNameFromKey } from "./utils";

export function format(
  adapter: Adapter,
  _settings: FormatSettings
): FormatResult {
  const { definitions, metas } = adapter;
  const types: TypeDefinitionsObject = {};
  const interfaces: InterfaceDefinitionsObject = {};
  Object.keys(definitions).forEach((key) => {
    const properties = definitions[key];
    const interfaceName = `${componentNameFromName(metas[key].name)}Props`;
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
  });
  const lines = [
    ...Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
    ...Object.values(interfaces),
  ];
  return { label: "Types", language: "ts", lines, settings: [] };
}

function formatInterfaceProperties(
  interfaceName: string,
  propName: string,
  types: TypeDefinitionsObject,
  definition: SafePropertyDefinition
) {
  const name = propertyNameFromKey(propName);
  if (definition.type === "BOOLEAN") {
    return `${name}: boolean;`;
  } else if (definition.type === "NUMBER") {
    return `${name}: number;`;
  } else if (definition.type === "TEXT") {
    return `${name}: string;`;
  } else if (definition.type === "VARIANT") {
    const n = `${interfaceName}${componentNameFromName(propName)}`;
    const value = (definition.variantOptions || [])
      .map((o) => `'${o}'`)
      .join(" | ");
    types[n] = value;
    return `${name}: ${n};`;
  } else if (definition.type === "EXPLICIT") {
    return `${name}: ${definition.defaultValue};`;
  } else if (definition.type === "INSTANCE_SWAP") {
    return `${name}: React.ReactNode;`;
  } else {
    return `${name}: ${JSON.stringify(definition)};`;
  }
}

type InterfaceDefinitionsObject = { [k: string]: string };
type TypeDefinitionsObject = { [k: string]: string };
