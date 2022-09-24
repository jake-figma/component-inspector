export function capitalize(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

export function downcase(name: string) {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

export function componentNameFromName(name: string) {
  return name
    .split(/[ _-]+/)
    .map(capitalize)
    .join("");
}

export function propertyNameFromKey(name: string) {
  return downcase(name.replace(/#.*$/, "").replace(/ /g, ""));
}

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

export type RelevantComponentNode = InstanceNode | ComponentNode;

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
