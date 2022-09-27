import { Adapter } from "./adapter";
import { FormatResult, FormatSettings } from "../shared";
import { SafeComponent, SafeProperty } from "./types";
import { componentNameFromName, propertyNameFromKey } from "./utils";

export function format(
  adapter: Adapter,
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
  adapter: Adapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  findText: boolean
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];

  const textKey = Object.keys(component.properties).find(
    (key) => definitions[key].type === "TEXT"
  );
  const children: string | null =
    findText && textKey
      ? `${component.properties[textKey].value}` || null
      : null;

  const neverDefaultType = (key: string) =>
    definitions[key].type === "INSTANCE_SWAP" ||
    definitions[key].type === "TEXT" ||
    definitions[key].type === "NUMBER";
  const isNotDefaultValue = (key: string) =>
    definitions[key].defaultValue !== component.properties[key].value;
  const notTextChildrenKey = (key: string) => !children || key !== textKey;

  const propertyKeys = Object.keys(component.properties).filter(
    (key) =>
      (showDefaults || neverDefaultType(key) || isNotDefaultValue(key)) &&
      notTextChildrenKey(key)
  );

  const isReferenceChecked = (name: string) => {
    const key = adapter.references.instances[name]?.visible;
    if (!key) {
      return true;
    }
    const visible = adapter.references.instances[name]?.visible || "";
    return component.properties[visible]?.value;
  };

  const lines = propertyKeys
    .sort()
    .map((key: string) =>
      isReferenceChecked(key)
        ? formatJsxProp(component.properties[key], key, explicitBoolean)
        : null
    )
    .filter(Boolean);
  const n = componentNameFromName(meta.name);
  return `<${n} ${lines.join(" ")} ${children ? `>${children}</${n}>` : `/>`}`;
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
