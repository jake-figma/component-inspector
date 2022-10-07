import { Adapter } from "./adapter";
import { FormatResult, FormatResultItem, FormatSettings } from "../shared";
import {
  SafeComponent,
  SafeProperty,
  SafePropertyDefinition,
  SafePropertyDefinitionMetaMap,
  SafePropertyDefinitions,
} from "./types";
import {
  capitalizedNameFromName,
  hyphenatedNameFromName,
  propertyNameFromKey,
} from "./utils";

export function format(
  adapter: Adapter,
  instanceSettings: FormatSettings
): FormatResult {
  return {
    label: "Angular",
    items: [
      formatInstances(adapter, instanceSettings),
      formatDefinitions(adapter),
    ],
  };
}

function formatDefinitions(adapter: Adapter): FormatResultItem {
  const { definitions, metas } = adapter;
  const lines: string[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    lines.push(
      [
        `/**`,
        ` * ${capitalizedNameFromName(metas[key].name)} Component`,
        ` */`,
      ].join("\n"),
      formatDefinitionsVariantOptionTypes(metas[key].name, definition).join(
        "\n"
      ),
      ...formatDefinitionsComponentClass(key, definition, metas)
    );
  });
  return {
    label: "Definitions",
    language: "ts",
    lines,
    settings: [],
  };
}

function formatInstances(
  adapter: Adapter,
  settings: FormatSettings
): FormatResultItem {
  const [showDefaults, explicitBoolean, findSlot] = settings.map((a) =>
    Boolean(a[1])
  );
  const { components } = adapter;
  const lines: string[] = [];
  Object.values(components).forEach((component) =>
    lines.push(
      formatInstancesInstanceFromComponent(
        component,
        adapter,
        showDefaults,
        explicitBoolean,
        findSlot
      )
    )
  );
  return {
    label: "Instances",
    language: "angular",
    lines,
    settings,
    settingsKey: "instance",
  };
}

function formatInstancesInstanceFromComponent(
  component: SafeComponent,
  adapter: Adapter,
  showDefaults: boolean,
  explicitBoolean: boolean,
  findSlot: boolean
) {
  const definitions = adapter.definitions[component.definition];
  const meta = adapter.metas[component.definition];

  const textKey = Object.keys(component.properties).find(
    (key) =>
      definitions[key].type === "TEXT" && !component.properties[key].undefined
  );
  const slot: string | null =
    findSlot && textKey
      ? `${component.properties[textKey].value}` || null
      : null;

  const neverDefaultType = (key: string) =>
    definitions[key].type === "INSTANCE_SWAP" ||
    definitions[key].type === "TEXT" ||
    definitions[key].type === "NUMBER";
  const isNotDefaultValue = (key: string) =>
    definitions[key].defaultValue !== component.properties[key].value;
  const notTextChildrenKey = (key: string) => !slot || key !== textKey;

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
        : formatInstancesAttributeFromProperty(
            component.properties[key],
            key,
            explicitBoolean
          )
    )
    .filter(Boolean);
  const n = hyphenatedNameFromName(meta.name);
  return `<${n} ${lines.join(" ")}>${slot || ""}</${n}>\n`;
}

function formatInstancesAttributeFromProperty(
  property: SafeProperty,
  name: string,
  explicitBoolean: boolean
) {
  if (property.undefined) {
    return "";
  }
  const clean = propertyNameFromKey(name);
  if (property.type === "BOOLEAN") {
    return explicitBoolean
      ? `[${clean}]="${property.value}"`
      : property.value
      ? `[${clean}]`
      : "";
  } else if (property.type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(property.value);
    return node
      ? `[${clean}]="${capitalizedNameFromName(node.name)}"`
      : `[${clean}]="${property.value}"`;
  } else {
    return `[${clean}]="${property.value}"`;
  }
}

function formatDefinitionsComponentClass(
  key: string,
  definitions: SafePropertyDefinitions,
  metas: SafePropertyDefinitionMetaMap
): string[] {
  const meta = metas[key];
  const keys = Object.keys(definitions).sort();
  return [
    `@Component({ selector: '${hyphenatedNameFromName(meta.name)}' })`,
    `class ${capitalizedNameFromName(meta.name)} {`,
    keys
      .map((key) =>
        definitions[key].hidden
          ? null
          : formatDefinitionsInputProperty(meta.name, definitions[key])
      )
      .filter(Boolean)
      .join("\n"),
    "}",
  ];
}

function formatDefinitionsInputProperty(
  componentName: string,
  definition: SafePropertyDefinition
): string {
  const { name, type, defaultValue, optional } = definition;
  const clean = propertyNameFromKey(name);
  if (type === "BOOLEAN") {
    return `@Input() ${clean}?: boolean = ${defaultValue};`;
  } else if (type === "INSTANCE_SWAP") {
    const node = figma.getNodeById(defaultValue);
    const value = node
      ? node.name === "undefined"
        ? ""
        : ` = "${capitalizedNameFromName(node.name)}";`
      : ` = "${defaultValue}"`;
    return node
      ? `@Input() ${clean}?: Component${value};`
      : `@Input() ${clean}?: string${value};`;
  } else if (type === "NUMBER") {
    return `@Input() ${clean}?: number = ${defaultValue};`;
  } else if (type === "VARIANT") {
    return `@Input() ${clean}?: ${typeNameForComponentProperty(
      componentName,
      name
    )}${
      optional && defaultValue === "undefined" ? "" : ` = "${defaultValue}";`
    }`;
  } else {
    return `@Input() ${clean}?: string  = "${defaultValue}";`;
  }
}

function formatDefinitionsVariantOptionTypes(
  componentName: string,
  definitions: SafePropertyDefinitions
): string[] {
  const types: string[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    if (definition.type === "VARIANT") {
      types.push(
        `type ${typeNameForComponentProperty(
          componentName,
          definition.name
        )} = ${definition.variantOptions.map((o) => `'${o}'`).join(" | ")}`
      );
    }
  });
  return types;
}

function typeNameForComponentProperty(componentName: string, name: string) {
  return `${capitalizedNameFromName(componentName)}${capitalizedNameFromName(
    name
  )}`;
}
