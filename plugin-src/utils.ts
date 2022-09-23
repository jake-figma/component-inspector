import ComponentAdapter, {
  SafeComponent,
  SafeProperty,
  SafePropertyDefinition,
} from "./ComponentAdapter";

const capitalize = (name: string) =>
  `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

const downcase = (name: string) =>
  `${name.charAt(0).toLowerCase()}${name.slice(1)}`;

export function componentNameFromName(name: string) {
  return name
    .split(/[ _-]+/)
    .map(capitalize)
    .join("");
}
export const propertyNameFromKey = (name: string) =>
  downcase(name.replace(/#.*$/, "").replace(/ /g, ""));

export function asBoolean(string: string) {
  return { false: false, true: true }[string.toLowerCase()] === true;
}
export function isBoolean(string: string) {
  return ["false", "true"].includes(string.toLowerCase());
}
export function asNumber(string: string) {
  return parseFloat(string);
}
export function isNumber(string: string) {
  return Boolean(string.match(/^\d*\.?\d+$/));
}

function formatJsxProp(
  property: SafeProperty,
  name: string,
  explicitBoolean: boolean
) {
  const clean = propertyNameFromKey(name);
  if (property.type === "BOOLEAN") {
    return explicitBoolean
      ? `${clean}={${property.value}}`
      : property.value
      ? clean
      : "";
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `${clean}={<${componentNameFromName(node.name)} />}`
      : `${clean}="${property.value}"`;
  } else {
    return `${clean}="${property.value}"`;
  }
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

type RelevantComponentNode = InstanceNode | ComponentNode;

export function extractDataFromAdapter(
  adapter: ComponentAdapter,
  showDefaults = false,
  explicitBoolean = false,
  findText = false
) {
  const { types, interfaces } = extractTypesFromAdapter(adapter);
  const instances = extractInstancesFromAdapter(
    adapter,
    showDefaults,
    explicitBoolean,
    findText
  );
  return { instances, types, interfaces };
}

function extractTypesFromAdapter({ definitions, metas }: ComponentAdapter) {
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
  return { types, interfaces };
}

function extractInstancesFromAdapter(
  adapter: ComponentAdapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  findText: boolean
) {
  const { components } = adapter;
  return Object.values(components).map((component) =>
    componentToJsxTypeString(
      component,
      adapter,
      showDefaults,
      explicitBoolean,
      findText
    )
  );
}

function componentToJsxTypeString(
  component: SafeComponent,
  adapter: ComponentAdapter,
  showDefaults = false,
  explicitBoolean = false,
  findText = false
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];
  const node = figma.getNodeById(component.id) as ComponentNode | InstanceNode;

  const textNode: TextNode | null = findText
    ? (node.children.find((c) => c.type === "TEXT") as TextNode) || null
    : null;

  const isInstance = node.type === "INSTANCE";
  const keys = Object.keys(component.properties).filter(
    (key) =>
      showDefaults ||
      definitions[key].type === "INSTANCE_SWAP" ||
      (isInstance &&
        definitions[key].defaultValue !== node.componentProperties[key].value)
  );
  const text = textNode?.characters || "";
  const isReferenceChecked = (name: string) => {
    const key = adapter.references[name]?.visible;
    if (!key) {
      return true;
    }
    const visible = adapter.references[name]?.visible || "";
    return isInstance
      ? node.componentProperties[visible]?.value
      : definitions[visible]?.defaultValue;
  };
  const formatMap = (name: string) =>
    isReferenceChecked(name)
      ? formatJsxProp(component.properties[name], name, explicitBoolean)
      : null;
  const lines = keys.sort().map(formatMap).filter(Boolean);
  const n = componentNameFromName(meta.name);
  return `<${n} ${lines.join(" ")} ${text ? `>${text}</${n}>` : `/>`}`;
}

// Filtering nodes to instances and components that are not variant comonents
export function componentNodesFromSceneNodes(
  nodes: SceneNode[]
): RelevantComponentNode[] {
  return nodes
    .filter(
      (n) =>
        n.type === "INSTANCE" ||
        (n.type === "COMPONENT" && n.parent?.type !== "COMPONENT_SET")
    )
    .map((n) => {
      switch (n.type) {
        case "INSTANCE":
          return n as InstanceNode;
        case "COMPONENT":
        default:
          return n as ComponentNode;
      }
    });
}

type InterfaceDefinitionsObject = { [k: string]: string };
type TypeDefinitionsObject = { [k: string]: string };
