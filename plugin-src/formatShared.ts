import { Adapter } from "./adapter";
import { SafeComponent, SafeProperty, SafePropertyDefinitions } from "./types";
import { slotTagFromKey } from "./utils";

export interface SlotKeysData {
  slotKeys: string[];
  slotTextKeys: string[];
  hasInstanceSlots: boolean;
  hasOneTextProperty: boolean;
}

function isVisibleKey(key: string, component: SafeComponent, adapter: Adapter) {
  const definitions = adapter.definitions[component.definition];
  const isToggledByBoolean = adapter.references.instances[key]?.visible;
  if (isToggledByBoolean) {
    const visible = adapter.references.instances[key]?.visible || "";
    return component.properties[visible]?.value;
  } else if (definitions[key].hidden) {
    return false;
  }
  return true;
}

export function slotKeysFromDefinitions(
  definitions: SafePropertyDefinitions,
  enableInstanceSlots: boolean
): SlotKeysData {
  const slotTextKeys = Object.keys(definitions).filter(
    (key) => definitions[key].type === "TEXT"
  );
  const hasOneTextProperty = slotTextKeys.length === 1;
  const instanceAndTextSlotKeys = Object.keys(definitions).filter(
    (key) =>
      (definitions[key].type === "TEXT" && slotTagFromKey(key)) ||
      (definitions[key].type === "INSTANCE_SWAP" && !definitions[key].hidden)
  );

  const hasInstanceSlots = Boolean(
    instanceAndTextSlotKeys.length && enableInstanceSlots
  );
  if (
    hasOneTextProperty &&
    hasInstanceSlots &&
    !instanceAndTextSlotKeys.includes(slotTextKeys[0])
  ) {
    instanceAndTextSlotKeys.push(slotTextKeys[0]);
  }

  return {
    slotKeys: hasInstanceSlots
      ? instanceAndTextSlotKeys
      : hasOneTextProperty
      ? slotTextKeys
      : [],
    slotTextKeys,
    hasInstanceSlots,
    hasOneTextProperty,
  };
}

function slotKeysFromComponentAndAdapter(
  component: SafeComponent,
  adapter: Adapter,
  enableInstanceSlots: boolean
): SlotKeysData {
  const definitions = adapter.definitions[component.definition];
  const allTextKeys = Object.keys(component.properties).filter(
    (key) => definitions[key].type === "TEXT"
  );
  const slotTextKeys = allTextKeys.filter(
    (key) => !component.properties[key].undefined
  );
  const hasOneTextProperty = allTextKeys.length === 1;
  const instanceAndTextSlotKeys = Object.keys(component.properties).filter(
    (key) =>
      !component.properties[key].undefined &&
      ((definitions[key].type === "TEXT" && slotTagFromKey(key)) ||
        (definitions[key].type === "INSTANCE_SWAP" &&
          isVisibleKey(key, component, adapter)))
  );

  const hasInstanceSlots = Boolean(
    instanceAndTextSlotKeys.length && enableInstanceSlots
  );
  if (hasOneTextProperty && hasInstanceSlots) {
    instanceAndTextSlotKeys.push(slotTextKeys[0]);
  }
  return {
    slotKeys: hasInstanceSlots
      ? instanceAndTextSlotKeys
      : hasOneTextProperty
      ? slotTextKeys
      : [],
    slotTextKeys,
    hasInstanceSlots,
    hasOneTextProperty,
  };
}

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

  const { slotKeys, slotTextKeys, hasOneTextProperty } =
    slotKeysFromComponentAndAdapter(
      component,
      adapter,
      options.instanceSlot || false
    );

  const formatTag = (key: string, tag: string, value: string = "") =>
    slotFormatter(
      tag,
      key,
      slotKeys.length,
      hasOneTextProperty && key === slotTextKeys[0] && !slotTagFromKey(key),
      value
    );

  const slots = slotKeys.reduce<{ [k: string]: string }>((into, key) => {
    if (definitions[key].type === "TEXT") {
      const tag = slotTagFromKey(key) || "span";
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
  const notTextChildrenKey = (key: string) => !slotKeys.length || !slots[key];

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
        !isVisibleKey(key, component, adapter)
      )
        return null;
      const slotTag = slotTagFromKey(key);
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
