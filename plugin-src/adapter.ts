import {
  asBoolean,
  asNumber,
  capitalizedNameFromName,
  isBoolean,
  isNumber,
  propertyNameFromKey,
  RelevantComponentNode,
} from "./utils";
import {
  SafeComponentMap,
  SafeProperties,
  SafeProperty,
  SafePropertyDefinitionMetaMap,
  SafePropertyDefinition,
  SafePropertyDefinitions,
  SafePropertyDefinitionsMap,
  SafePropertyReferencesMap,
} from "./types";

export interface Adapter {
  metas: SafePropertyDefinitionMetaMap;
  definitions: SafePropertyDefinitionsMap;
  components: SafeComponentMap;
  references: SafePropertyReferencesMap;
}

export function adapter(nodes: RelevantComponentNode[]): Adapter {
  const metas: SafePropertyDefinitionMetaMap = {};
  const definitions: SafePropertyDefinitionsMap = {};
  const components: SafeComponentMap = {};
  const references: SafePropertyReferencesMap = {
    instances: {},
    characterNodes: {},
    visibleNodes: {},
    properties: {},
  };
  nodes.forEach((node) => {
    components[node.id] = processNodeInToSafeComponent(
      node,
      definitions,
      metas,
      references
    );
  });
  return { components, definitions, metas, references };
}

function processNodeInToSafeComponent(
  node: RelevantComponentNode,
  allDefinitions: SafePropertyDefinitionsMap,
  allMetas: SafePropertyDefinitionMetaMap,
  allReferences: SafePropertyReferencesMap
) {
  const definitionNode =
    node.type === "INSTANCE"
      ? node.mainComponent?.parent?.type === "COMPONENT_SET"
        ? node.mainComponent?.parent
        : node.mainComponent
      : node;
  const definition = definitionNode?.id || "";
  const name = capitalizedNameFromName(
    definitionNode?.name || "UNNAMEDCOMPONENT"
  );
  const componentPropertyDefinitions = getComponentPropertyDefinitions(node);
  const componentProperties = getComponentProperties(node);
  setSafePropertyReferencesMap(node, allReferences);
  allDefinitions[definition] =
    allDefinitions[definition] ||
    getSafePropertyDefinitions(componentPropertyDefinitions, allReferences);
  const atFigma = `@figma component:${definitionNode?.key}`;
  const documentationLinks =
    definitionNode?.documentationLinks?.map(({ uri }) => uri) || [];
  documentationLinks.push(atFigma);
  allMetas[definition] = {
    name,
    id: definition,
    description: definitionNode?.description,
    documentationLinks,
  };
  return {
    id: node.id,
    name,
    definition,
    properties: getSafeProperties(
      allDefinitions[definition],
      componentProperties,
      allReferences
    ),
  };
}

function createSafePropertyDefinition(
  key: string,
  componentPropertyDefinitions: ComponentPropertyDefinitions,
  references: SafePropertyReferencesMap
): SafePropertyDefinition {
  const definition = componentPropertyDefinitions[key];
  const { type } = definition;
  const variantOptions = definition.variantOptions || [];
  const rawValue = `${definition.defaultValue}`;
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
      const optionalIdx = variantOptions.indexOf("undefined");
      let optional = optionalIdx !== -1;
      if (optional) {
        variantOptions.splice(optionalIdx, 1);
      }
      return {
        name,
        type: type,
        defaultValue: rawValue,
        variantOptions,
        optional,
      };
    case "BOOLEAN":
      const ref = references.properties[key];
      const nodes = Object.keys(ref?.visibleNodes || {});
      const hidden =
        Boolean(ref?.visibleProperties) ||
        Boolean(nodes.find((id) => Boolean(references.characterNodes[id])));
      return {
        name,
        type,
        defaultValue: asBoolean(rawValue),
        hidden,
      };
    case "INSTANCE_SWAP":
      const instanceOptions: InstanceSwapPreferredValue[] =
        definition.preferredValues || [];
      return {
        name,
        type,
        defaultValue: rawValue,
        instanceOptions,
        optional: figma.getNodeById(rawValue)?.name === "undefined",
      };
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
  componentProperties: ComponentProperties,
  references: SafePropertyReferencesMap
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
      return {
        name,
        type,
        value: valueString,
        undefined:
          definition.optional &&
          figma.getNodeById(valueString)?.name === "undefined",
        default: valueString === defaultValue,
      };
    case "TEXT":
      const charNodeId = Object.keys(
        references.properties[key]?.characterNodes || {}
      )[0];
      return {
        name,
        type,
        value: valueString,
        undefined: charNodeId
          ? componentProperties[references.visibleNodes[charNodeId]]?.value ===
            false
          : false,
        default: valueString === defaultValue,
      };
    case "VARIANT":
      return {
        name,
        type,
        value: valueString,
        undefined: definition.optional && valueString === "undefined",
        default: valueString === defaultValue,
      };
  }
}

function getSafePropertyDefinitions(
  componentPropertyDefinitions: ComponentPropertyDefinitions,
  references: SafePropertyReferencesMap
) {
  const defs: { [k: string]: SafePropertyDefinition } = {};
  for (let key in componentPropertyDefinitions) {
    defs[key] = createSafePropertyDefinition(
      key,
      componentPropertyDefinitions,
      references
    );
  }
  return defs;
}

function getSafeProperties(
  definitions: SafePropertyDefinitions,
  componentProperties: ComponentProperties,
  references: SafePropertyReferencesMap
) {
  const properties: SafeProperties = {};
  for (let key in componentProperties) {
    properties[key] = createSafeProperty(
      key,
      definitions[key],
      componentProperties,
      references
    );
  }
  return properties;
}

function getComponentPropertyDefinitions(node: RelevantComponentNode) {
  if (node.type === "INSTANCE") {
    const parent =
      node.mainComponent?.parent?.type === "COMPONENT_SET"
        ? node.mainComponent?.parent
        : node.mainComponent;
    const parentDefinitions = parent?.componentPropertyDefinitions || {};
    return parentDefinitions;
  } else {
    return node.componentPropertyDefinitions;
  }
}

function getComponentProperties(node: RelevantComponentNode) {
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

function setSafePropertyReferencesMap(
  node: RelevantComponentNode,
  allReferences: SafePropertyReferencesMap
) {
  const referenceNode =
    node.type === "COMPONENT"
      ? node
      : node.type === "INSTANCE"
      ? node.mainComponent
      : node;
  const recurse = (nodes: readonly SceneNode[] = [], ancestorVisible = "") => {
    nodes.forEach((node) => {
      if (node.componentPropertyReferences) {
        const { characters, visible, mainComponent } =
          node.componentPropertyReferences;
        if (mainComponent) {
          // nested instances
          const visibleValue =
            !visible && !characters && ancestorVisible
              ? ancestorVisible
              : visible;
          allReferences.instances[mainComponent] = {
            visible: visibleValue,
            characters,
          };
        }
        if (characters || visible) {
          if (characters) {
            allReferences.properties[characters] =
              allReferences.properties[characters] || {};
            allReferences.properties[characters].characterNodes = {
              ...allReferences.properties[characters].characterNodes,
              [node.id]: true,
            };
            allReferences.characterNodes[node.id] = characters;
            if (!visible && ancestorVisible) {
              // nested text node
              allReferences.visibleNodes[node.id] = ancestorVisible;
              allReferences.properties[ancestorVisible].visibleNodes = {
                ...allReferences.properties[ancestorVisible].visibleNodes,
                [node.id]: true,
              };
            }
          }
          if (visible) {
            ancestorVisible = visible;
            allReferences.properties[visible] =
              allReferences.properties[visible] || {};
            if (node.type === "INSTANCE" || node.type === "TEXT") {
              allReferences.visibleNodes[node.id] = visible;
              if (mainComponent) {
                allReferences.properties[visible].visibleProperties = {
                  ...allReferences.properties[visible].visibleProperties,
                  [mainComponent]: true,
                };
              } else {
                allReferences.properties[visible].visibleNodes = {
                  ...allReferences.properties[visible].visibleNodes,
                  [node.id]: true,
                };
              }
            }
          }
        } else if (ancestorVisible && node.type === "INSTANCE") {
          // handling nested instance
          allReferences.visibleNodes[node.id] = ancestorVisible;
          allReferences.properties[ancestorVisible].visibleProperties = {
            ...allReferences.properties[ancestorVisible].visibleProperties,
            [mainComponent]: true,
          };
        }
      }
      if ("children" in node) {
        recurse(node.children, ancestorVisible);
      }
    });
  };
  if (referenceNode) {
    recurse(referenceNode.children);
  }
}
