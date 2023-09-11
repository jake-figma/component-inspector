import { Adapter } from "./adapter";
import {
  FormatLanguage,
  FormatResult,
  FormatResultItem,
  FormatSettings,
} from "../shared";
import {
  SafeProperty,
  SafePropertyDefinition,
  SafePropertyDefinitionMetaMap,
  SafePropertyDefinitions,
} from "./types";
import {
  formatInstancesInstanceFromComponent,
  slotKeysFromDefinitions,
} from "./formatShared";
import { generateBooleans, generateComments, generateDefaults } from "./config";

export function format(
  adapter: Adapter,
  settings: FormatSettings
): FormatResult {
  const items = [];
  items.push(
    formatInstances(adapter, settings),
    formatDefinitions(adapter, settings)
  );
  return {
    label: "Angular",
    items,
  };
}

function formatDefinitions(
  adapter: Adapter,
  settings: FormatSettings
): FormatResultItem {
  const { definitions, metas } = adapter;
  const code: { language: FormatLanguage; lines: string[] }[] = [];
  Object.entries(definitions).forEach(([key, definition]) => {
    code.push({
      language: "ts",
      lines: [
        generateComments()
          ? adapter.formatters.componentJsCommentFromMeta(metas[key])
          : "",
        formatDefinitionsVariantOptionTypes(metas[key].name, definition).join(
          "\n"
        ),
        ...formatDefinitionsComponentClass(key, definition, metas),
      ],
    });
  });
  return {
    label: settings.singleNode ? "Definition" : "Definitions",
    code,
    options: [],
  };

  // https://angular.io/guide/content-projection#multi-slot
  function formatDefinitionsComponentClass(
    key: string,
    definitions: SafePropertyDefinitions,
    metas: SafePropertyDefinitionMetaMap
  ): string[] {
    const meta = metas[key];
    const keys = Object.keys(definitions).sort();
    const { slotKeys, slotTextKeys, hasOneTextProperty } =
      slotKeysFromDefinitions(adapter, definitions, true);
    const capitalizedName = adapter.formatters.capitalizedNameFromName(
      meta.name
    );
    const template = slotKeys.map((key) =>
      hasOneTextProperty &&
      key === slotTextKeys[0] &&
      !adapter.formatters.slotTagFromKey(key)
        ? `<ng-content></ng-content>`
        : `<ng-content select="[${adapter.formatters.propertyNameFromKey(
            key
          )}]"></ng-content>`
    );
    const templateDefinition =
      template.length > 1
        ? `const template${capitalizedName} = [${template
            .map((a) => `\`${a}\``)
            .join(",")}].join("");\n\n`
        : template.length
        ? `const template${capitalizedName} = \`${template[0]}\`;\n\n`
        : "";
    return [
      `${templateDefinition}@Component({ selector: '${adapter.formatters.hyphenatedNameFromName(
        meta.name
      )}'${
        templateDefinition ? `, template: template${capitalizedName}` : ""
      } })`,
      `class ${capitalizedName} {`,
      keys
        .map((key) =>
          definitions[key].hidden || slotKeys.includes(key)
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
    const clean = adapter.formatters.propertyNameFromKey(name);
    if (type === "BOOLEAN") {
      return `@Input() ${clean}?: boolean = ${defaultValue};`;
    } else if (type === "INSTANCE_SWAP") {
      const node = figma.getNodeById(defaultValue);
      const value = node
        ? node.name === settings.valueOptional
          ? ""
          : ` = "${adapter.formatters.capitalizedNameFromName(node.name)}";`
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
        optional && defaultValue === settings.valueOptional
          ? ""
          : ` = "${defaultValue}";`
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
      if (definition.type === "VARIANT" && !definition.hidden) {
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
    return `${adapter.formatters.capitalizedNameFromName(
      componentName
    )}${adapter.formatters.capitalizedNameFromName(name)}`;
  }
}

function formatInstances(
  adapter: Adapter,
  settings: FormatSettings
): FormatResultItem {
  let [showDefaults, explicitBoolean] = settings.options.instance.map((a) =>
    Boolean(a[1])
  );
  showDefaults =
    generateDefaults() === null ? showDefaults : Boolean(generateDefaults());
  explicitBoolean =
    generateDefaults() === null ? explicitBoolean : Boolean(generateBooleans());

  const { components } = adapter;
  const lines: string[] = [];
  Object.values(components).forEach((component) =>
    lines.push(
      formatInstancesInstanceFromComponent(
        component,
        adapter,
        showDefaults,
        explicitBoolean,
        formatInstancesAttributeFromProperty,
        adapter.formatters.hyphenatedNameFromName,
        slotFormatter,
        {
          instanceSlot: true,
        }
      )
    )
  );
  return {
    label: settings.singleNode ? "Instance" : "Instances",
    code: [
      {
        language: "angular",
        lines,
      },
    ],
    options: settings.options.instance,
    optionsKey: "instance",
  };

  function slotFormatter(
    tag: string,
    key: string,
    slotCount: number,
    isDefault = false,
    value: string = ""
  ) {
    const tagged = `<${tag} ${adapter.formatters.propertyNameFromKey(
      key
    )}>${value}</${tag}>`;
    return (isDefault || slotCount === 1) && value ? value : tagged;
  }

  function formatInstancesAttributeFromProperty(
    property: SafeProperty,
    name: string,
    explicitBoolean: boolean
  ) {
    if (property.undefined) {
      return "";
    }
    const clean = adapter.formatters.propertyNameFromKey(name);
    if (property.type === "BOOLEAN") {
      return explicitBoolean
        ? `[${clean}]="${property.value}"`
        : property.value
        ? `[${clean}]`
        : "";
    } else if (property.type === "INSTANCE_SWAP") {
      const node = figma.getNodeById(property.value);
      return node
        ? `[${clean}]="${adapter.formatters.capitalizedNameFromName(
            node.name
          )}"`
        : `[${clean}]="${property.value}"`;
    } else {
      return `[${clean}]="${property.value}"`;
    }
  }
}
