import { Adapter } from "./adapter";
import { SafeComponent, SafeProperty } from "./types";
import { propertyNameFromKey } from "./utils";

export function formatInstancesInstanceFromComponent(
  component: SafeComponent,
  adapter: Adapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  findSlot: boolean,
  attributeFormatter: (
    property: SafeProperty,
    name: string,
    explicitBoolean: boolean
  ) => string,
  tagNameFormatter: (name: string) => string,
  options: { selfClosing?: boolean; slotAttr?: string } = {
    selfClosing: false,
  }
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];

  const textKeySingle = Object.keys(component.properties).find(
    (key) =>
      definitions[key].type === "TEXT" && !component.properties[key].undefined
  );
  const textKeysSlots = Object.keys(component.properties).filter(
    (key) =>
      definitions[key].type === "TEXT" &&
      !component.properties[key].undefined &&
      definitions[key].defaultValue.toString().match(/^SLOT-/)
  );
  const textKeys = textKeysSlots.length
    ? textKeysSlots
    : textKeySingle
    ? [textKeySingle]
    : [];
  const slots = findSlot
    ? textKeys.reduce<{ [k: string]: string }>((into, key) => {
        const tagMatch = definitions[key].defaultValue
          .toString()
          .match(/^SLOT-([a-z0-9]+)/);
        const tag = tagMatch ? tagMatch[1] : "";
        const val = component.properties[key].value;
        into[key] = tag
          ? `<${tag}${
              options.slotAttr
                ? ` ${options.slotAttr}="${propertyNameFromKey(key)}"`
                : ""
            }>${val}</${tag}>`
          : `${val}`;
        return into;
      }, {})
    : {};

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

  const lines = propertyKeys
    .sort()
    .map((key: string) =>
      adapter.definitions[component.definition][key].hidden ||
      !isVisibleKey(key)
        ? null
        : attributeFormatter(component.properties[key], key, explicitBoolean)
    )
    .filter(Boolean);
  const n = tagNameFormatter(meta.name) + "";
  const slotValues = Object.values(slots).map((s) => `  ${s}`);

  return !options.selfClosing || slotValues.length
    ? `<${n} ${lines.join(" ")}>
${slotValues.join("\n")}
</${n}>\n`
    : `<${n} ${lines.join(" ")} />`;
}
