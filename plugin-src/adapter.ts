import {
  asBoolean,
  asNumber,
  isBoolean,
  isNumber,
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
  SafePropertyDefinitionMeta,
} from "./types";
import { FormatSettings } from "../shared";

export interface Adapter {
  metas: SafePropertyDefinitionMetaMap;
  definitions: SafePropertyDefinitionsMap;
  components: SafeComponentMap;
  references: SafePropertyReferencesMap;
  formatters: {
    capitalizedNameFromName(name: string): string;
    componentJsCommentFromMeta(
      meta: SafePropertyDefinitionMeta,
      extra?: string
    ): string;
    hyphenatedNameFromName(name: string): string;
    propertyNameFromKey(key: string): string;
    slotTagFromKey(key: string): string;
  };
}

export function adapter(
  nodes: RelevantComponentNode[],
  settings: FormatSettings
): Adapter {
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

  return {
    components,
    definitions,
    metas,
    references,
    formatters: {
      capitalizedNameFromName: (key: string) =>
        capitalizedNameFromName(key, settings),
      componentJsCommentFromMeta: (
        meta: SafePropertyDefinitionMeta,
        extra = ""
      ) => componentJsCommentFromMeta(meta, extra, settings),
      hyphenatedNameFromName: (key: string) =>
        hyphenatedNameFromName(key, settings),
      propertyNameFromKey: (key: string) => propertyNameFromKey(key, settings),
      slotTagFromKey: (key: string) => slotTagFromKey(key, settings),
    },
  };

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
      definitionNode?.name || "UnnamedComponent",
      settings
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
    const name = propertyNameFromKey(key, settings);
    const hidden =
      settings.prefixIgnore &&
      key.substring(0, settings.prefixIgnore.length) === settings.prefixIgnore
        ? true
        : undefined;

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
          hidden,
        };
      }

      if (variantOptions.length === 2) {
        if (isBoolean(variantOptions[0]) && isBoolean(variantOptions[1])) {
          return {
            name,
            type: "BOOLEAN",
            defaultValue: asBoolean(rawValue),
            hidden,
          };
        }
      }

      // we could disable this if number variants were desired
      if (!variantOptions.map(isNumber).includes(false)) {
        return {
          name,
          type: "NUMBER",
          defaultValue: asNumber(rawValue),
          hidden,
        };
      }
    }

    switch (type) {
      case "VARIANT":
        const optionalIdx = settings.valueOptional
          ? variantOptions.indexOf(settings.valueOptional)
          : -1;
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
          hidden,
        };
      case "BOOLEAN":
        const ref = references.properties[key];
        const nodes = Object.keys(ref?.visibleNodes || {});
        return {
          name,
          type,
          defaultValue: asBoolean(rawValue),
          hidden:
            hidden ||
            Boolean(ref?.visibleProperties) ||
            Boolean(nodes.find((id) => Boolean(references.characterNodes[id]))),
        };
      case "INSTANCE_SWAP":
        const instanceOptions: InstanceSwapPreferredValue[] =
          definition.preferredValues || [];
        return {
          name,
          type,
          defaultValue: rawValue,
          instanceOptions,
          optional:
            figma.getNodeById(rawValue)?.name === settings.valueOptional,
          hidden,
        };
      case "TEXT":
        return isNumber(rawValue)
          ? {
              name,
              type: "NUMBER",
              defaultValue: asNumber(rawValue),
              hidden,
            }
          : {
              name,
              type,
              defaultValue: rawValue,
              hidden,
            };
      default:
        return {
          name,
          type,
          defaultValue: rawValue,
          hidden,
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
    const name = propertyNameFromKey(key, settings);
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
            ? componentProperties[references.visibleNodes[charNodeId]]
                ?.value === false
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
    const recurse = (
      nodes: readonly SceneNode[] = [],
      ancestorVisible = ""
    ) => {
      nodes.forEach((node) => {
        let localAncestorVisible = ancestorVisible;
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
              localAncestorVisible = visible;
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
          } else if (
            ancestorVisible &&
            node.type === "INSTANCE" &&
            mainComponent
          ) {
            // handling nested instance
            allReferences.visibleNodes[node.id] = ancestorVisible;
            allReferences.properties[ancestorVisible].visibleProperties = {
              ...allReferences.properties[ancestorVisible].visibleProperties,
              [mainComponent]: true,
            };
          }
        }
        if ("children" in node) {
          recurse(node.children, localAncestorVisible);
        }
      });
    };
    if (referenceNode) {
      recurse(referenceNode.children);
    }
  }
}

function componentJsCommentFromMeta(
  meta: SafePropertyDefinitionMeta,
  extra: string,
  settings: FormatSettings
): string {
  let documentation = [
    ...splitString(meta.description || "", 50).map((s, i) =>
      i === 0 ? s : `  ${s}`
    ),
    ...meta.documentationLinks,
  ]
    .filter(Boolean)
    .map((a) => ` * ${a}`)
    .join("\n");
  const componentName = capitalizedNameFromName(meta.name, settings);
  return [
    `/**`,
    ` * ${componentName} Component${extra}${
      documentation ? `\n${documentation}` : ""
    }`,
    ` */`,
  ].join("\n");
}

function capitalize(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function downcase(name: string) {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

function numericGuard(name: string) {
  if (name.charAt(0).match(/\d/)) {
    name = `N${name}`;
  }
  return name;
}

function capitalizedNameFromName(name: string, _settings: FormatSettings) {
  name = numericGuard(name);
  return name
    .split(/[^a-zA-Z\d]+/g)
    .map(capitalize)
    .join("");
}
function hyphenatedNameFromName(name: string, _settings: FormatSettings) {
  name = numericGuard(name);
  return name
    .replace(/[^a-zA-Z\d-_]/g, "")
    .replace(/[ _]+/g, "-")
    .replace(/([A-Z])/g, "-$1")
    .replace(/-+/g, "-")
    .replace(/^-/, "")
    .toLowerCase();
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function propertyNameFromKey(name: string, settings: FormatSettings) {
  name = name.replace(/#[^#]+$/g, "");
  if (settings.suffixSlot) {
    name = name.replace(
      new RegExp(`${escapeRegExp(settings.suffixSlot)}.+$`, "g"),
      ""
    );
  }
  return downcase(capitalizedNameFromName(name, settings).replace(/^\d+/g, ""));
}

function slotTagFromKey(key: string, settings: FormatSettings) {
  if (!settings.suffixSlot) {
    return "";
  }
  const match = key.match(
    new RegExp(`${escapeRegExp(settings.suffixSlot)}(\\[([a-zA-Z0-9-]+)\\])?`)
  );
  return match ? match[2] || "span" : "";
}

function splitString(string: string, maxLength: number): string[] {
  const arr = string?.split(" ");
  const result = [];
  let subString = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const word = arr[i];
    if (subString.length + word.length + 1 <= maxLength) {
      subString = subString + " " + word;
    } else {
      result.push(subString);
      subString = word;
    }
  }
  if (subString.length) {
    result.push(subString);
  }
  return result;
}
