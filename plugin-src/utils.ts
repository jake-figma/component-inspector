const capitalize = (name: string) =>
  `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

const cleanName = (name: string) => name.replace(/#.*$/, "");

const componentNameFromName = (name: string) =>
  name
    .split(/[ _-]+/)
    .map(capitalize)
    .join("");

function formatJsxProp(
  propertyOrDefinition: SafeComponentProperty | SafeComponentPropertyDefinition,
  name: string,
  explicitBoolean: boolean
) {
  const clean = cleanName(name);
  const { type } = propertyOrDefinition;
  if (type === "BOOLEAN") {
    const value =
      "value" in propertyOrDefinition
        ? propertyOrDefinition.value
        : propertyOrDefinition.defaultValue;
    return explicitBoolean ? `${clean}={${value}}` : value ? clean : "";
  } else if (type === "INSTANCE_SWAP") {
    const value =
      "value" in propertyOrDefinition
        ? propertyOrDefinition.value
        : propertyOrDefinition.defaultValue;
    const node = figma.getNodeById(value);
    return node
      ? `${clean}={<${capitalize(node.name)} />}`
      : `${clean}="${value}"`;
  } else {
    const value =
      "value" in propertyOrDefinition
        ? propertyOrDefinition.value
        : propertyOrDefinition.defaultValue;
    return `${clean}="${value}"`;
  }
}

function formatValueAsJsxProp(
  definitions: ComponentPropertyDefinitions,
  properties: ComponentProperties,
  name: string,
  explicitBoolean = false
) {
  const property = castSafeComponentProperty(definitions, properties, name);
  return formatJsxProp(property, name, explicitBoolean);
}
function formatDefaultValueAsJsxProp(
  definitions: ComponentPropertyDefinitions,
  name: string,
  explicitBoolean = false
) {
  const definition = castSafeComponentPropertyDefinition(definitions, name);
  return formatJsxProp(definition, name, explicitBoolean);
}

function formatDefinitionInterface(
  interfaceName: string,
  propName: string,
  types: TypeDefinitionsObject,
  definition: SafeComponentPropertyDefinition
) {
  if (definition.type === "BOOLEAN") {
    return "boolean";
  } else if (definition.type === "VARIANT") {
    const name = `${interfaceName}${capitalize(propName)}`;
    const value = (definition.variantOptions || [])
      .map((o) => `'${o}'`)
      .join(" | ");
    types[name] = value;
    return name;
  } else if (definition.type === "INSTANCE_SWAP") {
    return "React.ReactNode";
  } else {
    return JSON.stringify(definition);
  }
}

type RelevantComponentNodes = InstanceNode | ComponentNode;

function propertyDefinitionNodeFromNode(
  node: RelevantComponentNodes
): ComponentSetNode | ComponentNode | null {
  switch (node.type) {
    case "COMPONENT":
      return node;
    case "INSTANCE":
      return node.mainComponent?.parent
        ? (node.mainComponent?.parent as ComponentSetNode)
        : null;
  }
}

export function extractTypesFromInstance(
  node: RelevantComponentNodes,
  interfaces: InterfaceDefinitionsObject,
  types: TypeDefinitionsObject
) {
  const propertyDefinitionsNode = propertyDefinitionNodeFromNode(node);
  if (!propertyDefinitionsNode) {
    return null;
  }
  const { componentPropertyDefinitions, name, key } = propertyDefinitionsNode;
  const interfaceName = `${componentNameFromName(name)}Props`;
  const lines = Object.keys(componentPropertyDefinitions)
    .sort()
    .map(
      (propName) =>
        `${cleanName(propName)}: ${formatDefinitionInterface(
          interfaceName,
          propName,
          types,
          castSafeComponentPropertyDefinition(
            componentPropertyDefinitions,
            propName
          )
        )};`
    );
  interfaces[key] = `interface ${interfaceName} { ${lines.join(" ")} }`;
}

export function nodeToJsxTypeString(
  node: RelevantComponentNodes,
  showDefaults = false,
  explicitBoolean = false
) {
  const propertyDefinitionsNode = propertyDefinitionNodeFromNode(node);
  if (!propertyDefinitionsNode) {
    return "SOMETHING_BROKE";
  }
  const { componentPropertyDefinitions, name } = propertyDefinitionsNode;
  const textNode: TextNode | null =
    (node.children.find((c) => c.type === "TEXT") as TextNode) || null;

  const isInstance = node.type === "INSTANCE";
  const keys = Object.keys(
    isInstance ? node.componentProperties : componentPropertyDefinitions
  ).filter(
    (key) =>
      showDefaults ||
      componentPropertyDefinitions[key].type === "INSTANCE_SWAP" ||
      (isInstance &&
        componentPropertyDefinitions[key].defaultValue !==
          node.componentProperties[key].value)
  );
  const text = textNode?.characters || "";
  const lines = keys
    .sort()
    .map((name) =>
      isInstance
        ? formatValueAsJsxProp(
            componentPropertyDefinitions,
            node.componentProperties,
            name,
            explicitBoolean
          )
        : formatDefaultValueAsJsxProp(
            componentPropertyDefinitions,
            name,
            explicitBoolean
          )
    )
    .filter(Boolean);
  const n = componentNameFromName(name);
  return `<${n} ${lines.join(" ")} ${text ? `>${text}</${n}>` : `/>`}`;
}

// Filtering nodes to instances and components that are not variant comonents
export function componentNodesFromSceneNodes(
  nodes: SceneNode[]
): RelevantComponentNodes[] {
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

export type InterfaceDefinitionsObject = { [k: string]: string };
export type TypeDefinitionsObject = { [k: string]: string };

interface SafeComponentPropertyDefinitionBoolean {
  type: Extract<ComponentPropertyType, "BOOLEAN">;
  defaultValue: boolean;
}
interface SafeComponentPropertyDefinitionTextAndInstanceSwap {
  type: Extract<ComponentPropertyType, "TEXT" | "INSTANCE_SWAP">;
  defaultValue: string;
}
interface SafeComponentPropertyDefinitionVariant {
  type: Extract<ComponentPropertyType, "VARIANT">;
  defaultValue: string;
  variantOptions: string[];
}

type SafeComponentPropertyDefinition =
  | SafeComponentPropertyDefinitionBoolean
  | SafeComponentPropertyDefinitionTextAndInstanceSwap
  | SafeComponentPropertyDefinitionVariant;

interface SafeComponentPropertyBoolean {
  type: Extract<ComponentPropertyType, "BOOLEAN">;
  value: boolean;
}
interface SafeComponentPropertyTextAndInstanceSwapAndVariant {
  type: Extract<ComponentPropertyType, "TEXT" | "INSTANCE_SWAP" | "VARIANT">;
  value: string;
}

type SafeComponentProperty =
  | SafeComponentPropertyBoolean
  | SafeComponentPropertyTextAndInstanceSwapAndVariant;

const castSafeComponentPropertyDefinition = (
  definitions: ComponentPropertyDefinitions,
  name: string
): SafeComponentPropertyDefinition => {
  const { type, defaultValue, variantOptions } = definitions[name];
  if (type === "VARIANT" && variantOptions?.sort().join("") === "falsetrue") {
    return {
      type: "BOOLEAN",
      defaultValue: defaultValue === "true",
    };
  }
  switch (type) {
    case "VARIANT":
      return {
        type,
        defaultValue: defaultValue as string,
        variantOptions: variantOptions as string[],
      };
    case "BOOLEAN":
      return {
        type,
        defaultValue: defaultValue as boolean,
      };
    case "INSTANCE_SWAP":
    case "TEXT":
      return {
        type,
        defaultValue: defaultValue as string,
      };
  }
};

const castSafeComponentProperty = (
  definitions: ComponentPropertyDefinitions,
  properties: ComponentProperties,
  name: string
): SafeComponentProperty => {
  const { type } = castSafeComponentPropertyDefinition(definitions, name);
  const { value } = properties[name];
  switch (type) {
    case "BOOLEAN":
      return {
        type,
        value: ["true", true].includes(value),
      };
    case "VARIANT":
    case "INSTANCE_SWAP":
    case "TEXT":
      return {
        type,
        value: value as string,
      };
  }
};
