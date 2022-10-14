import { SafePropertyDefinitionMeta } from "./types";

export function capitalize(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

export function downcase(name: string) {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

export function capitalizedNameFromName(name: string) {
  return name
    .split(/[^a-zA-Z\d]+/g)
    .map(capitalize)
    .join("");
}
export function hyphenatedNameFromName(name: string) {
  return name
    .replace(/[ _]+/g, "-")
    .replace(/([A-Z])/g, "-$1")
    .replace(/-+/g, "-")
    .replace(/^-/, "")
    .toLowerCase();
}

export function propertyNameFromKey(name: string) {
  return downcase(capitalizedNameFromName(name).replace(/\d/g, ""));
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

export function componentJsCommentFromMeta(
  meta: SafePropertyDefinitionMeta,
  extra = ""
): string {
  let documentation = [meta.description, ...meta.documentationLinks]
    .filter(Boolean)
    .map((a) => ` * ${a}`)
    .join("\n");
  const componentName = capitalizedNameFromName(meta.name);
  return [
    `/**`,
    " * ",
    ` * ${componentName} Component${extra}${
      documentation ? `\n * \n${documentation}` : ""
    }`,
    " * ",
    ` */`,
  ].join("\n");
}
