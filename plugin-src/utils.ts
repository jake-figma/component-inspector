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

export type RelevantComponentNode =
  | InstanceNode
  | ComponentNode
  | ComponentSetNode;

// Filtering nodes to instances and components that are not variant comonents
export function componentNodesFromSceneNodes(
  nodes: SceneNode[]
): RelevantComponentNode[] {
  return nodes
    .filter(
      (n) =>
        n.type === "INSTANCE" ||
        n.type === "COMPONENT_SET" ||
        (n.type === "COMPONENT" && n.parent?.type !== "COMPONENT_SET")
    )
    .map((n) => {
      switch (n.type) {
        case "INSTANCE":
          return n as InstanceNode;
        case "COMPONENT_SET":
          return n as ComponentSetNode;
        case "COMPONENT":
        default:
          return n as ComponentNode;
      }
    });
}
