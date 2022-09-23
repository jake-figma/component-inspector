import {
  asBoolean,
  asNumber,
  componentNameFromName,
  isBoolean,
  isNumber,
  propertyNameFromKey,
} from "./utils";

export default class ComponentAdapter {
  metas: SafeDefinitionMeta = {};
  definitions: { [k: string]: SafePropertyDefinitions } = {};
  components: {
    [k: string]: SafeComponent;
  } = {};
  references: SafePropertyReferences = {};

  add(node: InstanceNode | ComponentNode) {
    this.components[node.id] = processNodeInToSafeComponent(
      node,
      this.definitions,
      this.metas,
      this.references
    );
  }

  clear() {
    this.metas = {};
    this.definitions = {};
    this.components = {};
    this.references = {};
  }

  json() {
    return {
      components: this.components,
      definitions: this.definitions,
      metas: this.metas,
      references: this.references,
    };
  }
}

function processNodeInToSafeComponent(
  node: InstanceNode | ComponentNode,
  allDefinitions: { [k: string]: SafePropertyDefinitions },
  allMetas: SafeDefinitionMeta,
  references: SafePropertyReferences
) {
  const definition =
    (node.type === "INSTANCE" ? node.mainComponent?.parent?.id : node.id) || "";
  const componentPropertyDefinitions = getComponentPropertyDefinitions(node);
  const componentProperties = getComponentProperties(node);
  setSafePropertyReferences(node, references);
  allDefinitions[definition] =
    allDefinitions[definition] ||
    getSafePropertyDefinitions(componentPropertyDefinitions);
  allMetas[definition] = { name: node.name, id: node.id };
  return {
    id: node.id,
    name: componentNameFromName(node.name),
    definition,
    properties: getSafeProperties(
      allDefinitions[definition],
      componentProperties
    ),
  };
}

function createSafePropertyDefinition(
  key: string,
  componentPropertyDefinitions: ComponentPropertyDefinitions
): SafePropertyDefinition {
  const defs = componentPropertyDefinitions[key];
  const { type } = defs;
  const variantOptions = defs.variantOptions || [];
  const rawValue = `${defs.defaultValue}`;
  const name = propertyNameFromKey(key);

  if (type === "VARIANT") {
    if (variantOptions.length === 1) {
      const defaultValue = isNumber(rawValue)
        ? asNumber(rawValue)
        : isBoolean(rawValue)
        ? asBoolean(rawValue)
        : rawValue;
      return {
        name,
        type: "EXPLICIT",
        defaultValue,
      };
    }

    if (variantOptions.length === 2) {
      if (isBoolean(variantOptions[0]) && isBoolean(variantOptions[1])) {
        return {
          name,
          type: "BOOLEAN",
          defaultValue: asBoolean(rawValue),
        };
      }
    }

    // we could disable this if number variants were desired
    if (!variantOptions.map(isNumber).includes(false)) {
      return {
        name,
        type: "NUMBER",
        defaultValue: asNumber(rawValue),
      };
    }
  }

  switch (type) {
    case "VARIANT":
      return {
        name,
        type: type,
        defaultValue: rawValue,
        variantOptions,
      };
    case "BOOLEAN":
      return {
        name,
        type,
        defaultValue: asBoolean(rawValue),
      };
    case "INSTANCE_SWAP":
    case "TEXT":
    default:
      return {
        name,
        type,
        defaultValue: rawValue,
      };
  }
}
function createSafeProperty(
  key: string,
  definition: SafePropertyDefinition,
  componentProperties: ComponentProperties
): SafeProperty {
  const { type, defaultValue } = definition;
  const property = componentProperties[key];
  const valueString = `${property.value}`;
  const valueBoolean = asBoolean(valueString);
  const valueNumber = asNumber(valueString);
  const name = propertyNameFromKey(key);
  switch (type) {
    case "BOOLEAN":
      return {
        name,
        type,
        value: valueBoolean,
        default: valueBoolean === defaultValue,
      };
    case "EXPLICIT":
      const value = isNumber(valueString)
        ? valueNumber
        : isBoolean(valueString)
        ? valueBoolean
        : valueString;
      return {
        name,
        type,
        value,
        default: value === defaultValue,
      };
    case "NUMBER":
      return {
        name,
        type,
        value: valueNumber,
        default: valueNumber === defaultValue,
      };
    case "INSTANCE_SWAP":
    case "TEXT":
    case "VARIANT":
      return {
        name,
        type,
        value: valueString,
        default: valueString === defaultValue,
      };
  }
}

function getSafePropertyDefinitions(
  componentPropertyDefinitions: ComponentPropertyDefinitions
) {
  const defs: { [k: string]: SafePropertyDefinition } = {};
  for (let key in componentPropertyDefinitions) {
    defs[key] = createSafePropertyDefinition(key, componentPropertyDefinitions);
  }
  return defs;
}

function getSafeProperties(
  definitions: SafePropertyDefinitions,
  componentProperties: ComponentProperties
) {
  const properties: SafeProperties = {};
  for (let key in componentProperties) {
    properties[key] = createSafeProperty(
      key,
      definitions[key],
      componentProperties
    );
  }
  return properties;
}

function getComponentPropertyDefinitions(node: InstanceNode | ComponentNode) {
  if (node.type === "INSTANCE") {
    const parent = node.mainComponent?.parent as ComponentSetNode | undefined;
    const parentDefinitions = parent?.componentPropertyDefinitions || {};
    return parentDefinitions;
  } else {
    return node.componentPropertyDefinitions;
  }
}

function getComponentProperties(node: InstanceNode | ComponentNode) {
  if (node.type === "INSTANCE") {
    return node.componentProperties;
  } else {
    const componentProperties: ComponentProperties = {};
    for (let key in node.componentPropertyDefinitions) {
      const { type, defaultValue } = node.componentPropertyDefinitions[key];
      componentProperties[key] = { type, value: defaultValue };
    }
    return componentProperties;
  }
}

function setSafePropertyReferences(
  node: InstanceNode | ComponentNode,
  references: SafePropertyReferences
) {
  const referenceNode = node.type === "COMPONENT" ? node : node.mainComponent;
  if (!referenceNode) {
    return;
  }
  const recurse = (nodes: readonly SceneNode[]) => {
    nodes.forEach((node) => {
      if (node.componentPropertyReferences) {
        // 'visible' | 'characters' | 'mainComponent'
        const { characters, visible, mainComponent } =
          node.componentPropertyReferences;
        if (mainComponent) {
          references[mainComponent] = {
            visible,
            characters,
          };
        }
      }
      if ("children" in node) {
        recurse(node.children);
      }
    });
  };
  recurse(referenceNode.children);
}

type SafePropertyReferences = {
  [k: string]: { visible?: string; characters?: string };
};

type SafeType =
  | "BOOLEAN"
  | "EXPLICIT"
  | "INSTANCE_SWAP"
  | "NUMBER"
  | "TEXT"
  | "VARIANT";

interface SafePropertyDefinitionBoolean {
  type: Extract<SafeType, "BOOLEAN">;
  defaultValue: boolean;
}
interface SafePropertyDefinitionExplicit {
  type: Extract<SafeType, "EXPLICIT">;
  defaultValue: string | number | boolean;
}
interface SafePropertyDefinitionNumber {
  type: Extract<SafeType, "NUMBER">;
  defaultValue: number;
}
interface SafePropertyDefinitionString {
  type: Extract<SafeType, "INSTANCE_SWAP" | "TEXT">;
  defaultValue: string;
}
interface SafePropertyDefinitionVariant {
  type: Extract<SafeType, "VARIANT">;
  defaultValue: string | number;
  variantOptions: string[] | number[];
}

interface SafePropertyBoolean {
  type: Extract<SafeType, "BOOLEAN">;
  value: boolean;
}
interface SafePropertyExplicit {
  type: Extract<SafeType, "EXPLICIT">;
  value: string | number | boolean;
}
interface SafePropertyNumber {
  type: Extract<SafeType, "NUMBER">;
  value: number;
}
interface SafePropertyString {
  type: Extract<SafeType, "INSTANCE_SWAP" | "TEXT">;
  value: string;
}
interface SafePropertyVariant {
  type: Extract<SafeType, "VARIANT">;
  value: string | number;
}

export type SafePropertyDefinition = { name: string } & (
  | SafePropertyDefinitionBoolean
  | SafePropertyDefinitionExplicit
  | SafePropertyDefinitionNumber
  | SafePropertyDefinitionString
  | SafePropertyDefinitionVariant
);

export type SafeProperty = { name: string; default: boolean } & (
  | SafePropertyBoolean
  | SafePropertyExplicit
  | SafePropertyNumber
  | SafePropertyString
  | SafePropertyVariant
);

export interface SafeComponent {
  id: string;
  name: string;
  definition: string;
  properties: SafeProperties;
}

type SafeDefinitionMeta = {
  [k: string]: { name: string; id: string };
};
type SafePropertyDefinitions = {
  [k: string]: SafePropertyDefinition;
};

type SafeProperties = {
  [k: string]: SafeProperty;
};
