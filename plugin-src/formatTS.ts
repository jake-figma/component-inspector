import ComponentAdapter from "./ComponentAdapter";
import { FormatResult, FormatSettings } from "../shared";
import { SafePropertyDefinition } from "./types";
import { componentNameFromName, propertyNameFromKey } from "./utils";

export function format(
  adapter: ComponentAdapter,
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
      .map(
        (propName) =>
          `${propertyNameFromKey(propName)}: ${formatDefinitionInterface(
            interfaceName,
            propName,
            types,
            properties[propName]
          )};`
      );
    interfaces[key] = `interface ${interfaceName} { ${lines.join(" ")} }`;
  });
  const lines = [
    ...Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
    ...Object.values(interfaces),
  ];
  return { label: "Types", language: "ts", lines, settings: [] };
}

function formatDefinitionInterface(
  interfaceName: string,
  propName: string,
  types: TypeDefinitionsObject,
  definition: SafePropertyDefinition
) {
  if (definition.type === "BOOLEAN") {
    return "boolean";
  } else if (definition.type === "NUMBER") {
    return "number";
  } else if (definition.type === "TEXT") {
    return "string";
  } else if (definition.type === "VARIANT") {
    const name = `${interfaceName}${componentNameFromName(propName)}`;
    const value = (definition.variantOptions || [])
      .map((o) => `'${o}'`)
      .join(" | ");
    types[name] = value;
    return name;
  } else if (definition.type === "EXPLICIT") {
    return definition.defaultValue;
  } else if (definition.type === "INSTANCE_SWAP") {
    return "React.ReactNode";
  } else {
    return JSON.stringify(definition);
  }
}

type InterfaceDefinitionsObject = { [k: string]: string };
type TypeDefinitionsObject = { [k: string]: string };
