import { Adapter } from "./adapter";
import { SafeComponent, SafeProperty, SafePropertyDefinition } from "./types";
import { propertyNameFromKey } from "./utils";

export function formatInstancesInstanceFromComponent(
  component: SafeComponent,
  adapter: Adapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  attributeFormatter: (
    property: SafeProperty,
    name: string,
    explicitBoolean: boolean,
    slotTag?: string
  ) => string,
  tagNameFormatter: (name: string) => string,
  slotFormatter: (
    tag: string,
    key: string,
    slotCount: number,
    isDefault?: boolean,
    value?: string
  ) => string,
  options: {
    instanceSlot?: boolean;
    selfClosing?: boolean;
  } = {
    instanceSlot: false,
    selfClosing: false,
  }
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];

  const isVisibleKey = (key: string) => {
    const isToggledByBoolean = adapter.references.instances[key]?.visible;
    if (isToggledByBoolean) {
      const visible = adapter.references.instances[key]?.visible || "";
      return component.properties[visible]?.value;
    } else if (definitions[key].hidden) {
      return false;
    }
    return true;
  };

  const textKeySingle = Object.keys(component.properties).filter(
    (key) =>
      definitions[key].type === "TEXT" && !component.properties[key].undefined
  );
  const hasOneTextProperty = textKeySingle.length === 1;
  const textKeysSlots = Object.keys(component.properties).filter(
    (key) =>
      !component.properties[key].undefined &&
      (slotTagFromTextDefinition(definitions[key]) ||
        (definitions[key].type === "INSTANCE_SWAP" && isVisibleKey(key)))
  );

  const hasInstanceSlots = textKeysSlots.length && options.instanceSlot;
  if (hasOneTextProperty && hasInstanceSlots) {
    textKeysSlots.push(textKeySingle[0]);
  }
  const textKeys = hasInstanceSlots
    ? textKeysSlots
    : hasOneTextProperty
    ? textKeySingle
    : [];

  const formatTag = (key: string, tag: string, value: string = "") =>
    slotFormatter(
      tag,
      key,
      textKeys.length,
      hasOneTextProperty && key === textKeySingle[0],
      value
    );

  const slots = textKeys.reduce<{ [k: string]: string }>((into, key) => {
    if (definitions[key].type === "TEXT") {
      const tagMatch = definitions[key].defaultValue
        .toString()
        .match(/^SLOT-?([a-z0-9]+)/);
      const tag = tagMatch ? tagMatch[1] : "span";
      into[key] = formatTag(
        key,
        tag,
        component.properties[key].value.toString()
      );
    } else if (
      options.instanceSlot &&
      definitions[key].type === "INSTANCE_SWAP"
    ) {
      const tag = tagNameFormatter(
        figma.getNodeById(component.properties[key].value.toString())?.name ||
          ""
      );
      into[key] = formatTag(key, tag);
    }
    return into;
  }, {});

  const neverDefaultType = (key: string) =>
    definitions[key].type === "INSTANCE_SWAP" ||
    definitions[key].type === "TEXT" ||
    definitions[key].type === "NUMBER";
  const isNotDefaultValue = (key: string) =>
    definitions[key].defaultValue !== component.properties[key].value;
  const notTextChildrenKey = (key: string) => !textKeys.length || !slots[key];

  const propertyKeys = Object.keys(component.properties).filter(
    (key) =>
      (showDefaults || neverDefaultType(key) || isNotDefaultValue(key)) &&
      notTextChildrenKey(key)
  );

  const lines = propertyKeys
    .sort()
    .map((key: string) => {
      if (
        adapter.definitions[component.definition][key].hidden ||
        !isVisibleKey(key)
      )
        return null;
      const slotTag = slotTagFromTextDefinition(
        adapter.definitions[component.definition][key]
      );
      return attributeFormatter(
        component.properties[key],
        key,
        explicitBoolean,
        slotTag
      );
    })
    .filter(Boolean);
  const n = tagNameFormatter(meta.name);
  const slotValues = Object.values(slots).map((s) => `  ${s}`);

  return !options.selfClosing || slotValues.length
    ? `<${n} ${lines.join(" ")}>
${slotValues.join("\n")}
</${n}>\n`
    : `<${n} ${lines.join(" ")} />`;
}

function slotTagFromTextDefinition(definition: SafePropertyDefinition) {
  const match = definition.defaultValue
    .toString()
    .match(/^SLOT-?([a-zA-Z0-9-]+)/);
  return definition.type === "TEXT" && match ? match[1] || "span" : "";
}
