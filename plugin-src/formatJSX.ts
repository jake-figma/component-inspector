import ComponentAdapter from "./ComponentAdapter";
import { FormatResult, FormatSettings } from "../shared";
import { SafeComponent, SafeProperty } from "./types";
import {
  componentNameFromName,
  propertyNameFromKey,
  RelevantComponentNode,
} from "./utils";

export function format(
  adapter: ComponentAdapter,
  settings: FormatSettings
): FormatResult {
  const { components } = adapter;
  const [showDefaults, explicitBoolean, findText] = settings.map((a) =>
    Boolean(a[1])
  );
  const lines = Object.values(components).map((component) =>
    componentToJsxTypeString(
      component,
      adapter,
      showDefaults,
      explicitBoolean,
      findText
    )
  );
  return {
    label: "Component",
    language: "jsx",
    lines,
    settings,
  };
}

function componentToJsxTypeString(
  component: SafeComponent,
  adapter: ComponentAdapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  findText: boolean
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];
  const node = figma.getNodeById(component.id) as RelevantComponentNode;

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
