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
  SafePropertyDefinitions,
  SafePropertyDefinitionMetaMap,
} from "./types";
import {
  formatInstancesInstanceFromComponent,
  SlotKeysData,
  slotKeysFromDefinitions,
} from "./formatShared";
import { generateBooleans, generateComments, generateDefaults } from "./config";

type TypeDefinitionsObject = { [k: string]: string };

export function format(
  adapter: Adapter,
  settings: FormatSettings
): FormatResult {
  return {
    label: "React",
    items: [
      formatInstances(adapter, settings),
      formatDefinitions(adapter, settings),
    ],
  };
}

function formatInstances(
  adapter: Adapter,
  settings: FormatSettings
): FormatResultItem {
  const { components } = adapter;
  let [showDefaults, explicitBoolean] = settings.options.instance.map((a) =>
    Boolean(a[1])
  );
  showDefaults =
    generateDefaults() === null ? showDefaults : Boolean(generateDefaults());
  explicitBoolean =
    generateDefaults() === null ? explicitBoolean : Boolean(generateBooleans());
  const lines = Object.values(components).map((component) =>
    formatInstancesInstanceFromComponent(
      component,
      adapter,
      showDefaults,
      explicitBoolean,
      formatInstancesAttributeFromProperty,
      adapter.formatters.capitalizedNameFromName,
      slotFormatter,
      { selfClosing: true }
    )
  );
  return {
    label: settings.singleNode ? "Instance" : "Instances",
    code: [
      {
        language: "jsx",
        lines,
      },
    ],
    options: settings.options.instance,
    optionsKey: "instance",
  };

  function slotFormatter(
    tag: string,
    _key: string,
    slotCount: number,
    isDefault = false,
    value: string = ""
  ) {
    const tagged = value ? `<${tag}>${value}</${tag}>` : `<${tag} />`;
    return slotCount === 1 && isDefault ? value : tagged;
  }

  function formatInstancesAttributeFromProperty(
    property: SafeProperty,
    name: string,
    explicitBoolean: boolean,
    slotTag?: string
  ) {
    const clean = adapter.formatters.propertyNameFromKey(name);
    if (property.undefined) {
      return "";
    }
    if (property.type === "BOOLEAN") {
      return explicitBoolean
        ? `${clean}={${property.value}}`
        : property.value
        ? clean
        : "";
    } else if (property.type === "NUMBER") {
      return `${clean}={${property.value}}`;
    } else if (property.type === "INSTANCE_SWAP") {
      const node = figma.getNodeById(property.value);
      return node
        ? `${clean}={<${adapter.formatters.capitalizedNameFromName(
            node.name
          )} />}`
        : `${clean}="${property.value}"`;
    } else if (property.type === "TEXT" && slotTag) {
      return `${clean}={<${slotTag}>${property.value}</${slotTag}>}`;
    } else {
      return `${clean}="${property.value}"`;
    }
  }
}

function formatDefinitions(
  adapter: Adapter,
  settings: FormatSettings
): FormatResultItem {
  const { definitions, metas } = adapter;
  const hasDefinitions = Object.keys(definitions).length;
  const code: { language: FormatLanguage; lines: string[] }[] =
    hasDefinitions && !settings.singleNode
      ? [
          {
            language: "tsx",
            lines: [`import { FC, ReactNode, } from "react";`],
          },
        ]
      : [];
  Object.keys(definitions).forEach((key) => {
    const types: TypeDefinitionsObject = {};
    const properties = definitions[key];
    const componentName = adapter.formatters.capitalizedNameFromName(
      metas[key].name
    );
    const slotKeysData = slotKeysFromDefinitions(adapter, properties, true);
    const interfaceName = `${componentName}Props`;
    const interfaceLines = Object.keys(properties)
      .sort()
      .map((propName) =>
        formatDefinitionsInterfaceProperties(
          interfaceName,
          propName,
          types,
          properties[propName],
          slotKeysData
        )
      )
      .filter(Boolean);

    code.push({
      language: "tsx",
      lines: [
        [
          settings.singleNode ? `import { FC, ReactNode, } from "react";` : "",
          generateComments()
            ? adapter.formatters.componentJsCommentFromMeta(metas[key])
            : "",
          Object.keys(types)
            .map((name) => `type ${name} = ${types[name]};`)
            .join("\n"),
          `interface ${interfaceName} { ${interfaceLines.join(" ")} }`,
          formatComponentFunctionFromDefinitionsAndMetas(
            key,
            properties,
            metas,
            slotKeysData
          ),
        ].join("\n\n"),
      ],
    });
  });

  return {
    label: settings.singleNode ? "Definition" : "Definitions",
    code,
    options: [],
  };

  function formatDefinitionsInterfaceProperties(
    interfaceName: string,
    propName: string,
    types: TypeDefinitionsObject,
    definition: SafePropertyDefinition,
    { slotTextKeys, hasOneTextProperty }: SlotKeysData
  ) {
    if (
      (hasOneTextProperty && propName === slotTextKeys[0]) ||
      definition.hidden
    ) {
      return "";
    }
    const name = adapter.formatters.propertyNameFromKey(propName);
    if (definition.type === "BOOLEAN") {
      return `${name}?: boolean;`;
    } else if (definition.type === "NUMBER") {
      return `${name}?: number;`;
    } else if (definition.type === "TEXT") {
      return `${name}?: ${
        slotTextKeys.includes(propName) ? "ReactNode" : "string"
      };`;
    } else if (definition.type === "VARIANT") {
      const n = `${interfaceName}${adapter.formatters.capitalizedNameFromName(
        propName
      )}`;
      const value = (definition.variantOptions || [])
        .map((o) => `'${o}'`)
        .join(" | ");
      types[n] = value;
      return `${name}?: ${n};`;
    } else if (definition.type === "EXPLICIT") {
      return `${name}?: "${definition.defaultValue}";`;
    } else if (definition.type === "INSTANCE_SWAP") {
      return `${name}?: ReactNode;`;
    } else {
      return `${name}?: ${JSON.stringify(definition)};`;
    }
  }

  function formatComponentFunctionFromDefinitionsAndMetas(
    key: string,
    definitions: SafePropertyDefinitions,
    metas: SafePropertyDefinitionMetaMap,
    slotKeysData: SlotKeysData
  ): string {
    const { slotTextKeys, hasOneTextProperty } = slotKeysData;
    const meta = metas[key];
    const keys = Object.keys(definitions).sort();
    const destructuredProps = `{
      ${keys
        .map((key) =>
          hasOneTextProperty && slotTextKeys[0] === key
            ? null
            : formatDefinitionInputProperty(
                definitions[key],
                slotTextKeys.includes(key)
              )
        )
        .filter(Boolean)
        .join("\n")}
      ${hasOneTextProperty ? "children" : ""}
    }`;
    const propsName = `${adapter.formatters.capitalizedNameFromName(
      meta.name
    )}Props`;
    const children = generateChildren(keys, slotKeysData);
    return `const ${adapter.formatters.capitalizedNameFromName(
      meta.name
    )}: FC<${propsName}> = (${destructuredProps}) => (<>${children}</>)`;
  }

  function generateChildren(
    keys: string[],
    { slotKeys, slotTextKeys, hasOneTextProperty }: SlotKeysData
  ) {
    const children: string[] = [];
    keys.forEach((key) => {
      if (slotTextKeys.includes(key)) {
        if (hasOneTextProperty) {
          children.push("children");
        } else {
          children.push(adapter.formatters.propertyNameFromKey(key));
        }
      } else if (slotKeys.includes(key)) {
        children.push(adapter.formatters.propertyNameFromKey(key));
      }
    });
    return children.map((c) => `{${c}}`).join("\n");
  }

  function formatDefinitionInputProperty(
    definition: SafePropertyDefinition,
    hideDefaultValue: boolean
  ): string {
    const { name, type, defaultValue } = definition;
    const clean = adapter.formatters.propertyNameFromKey(name);
    if (definition.hidden) {
      return "";
    }
    if (
      (definition.optional && defaultValue === "undefined") ||
      hideDefaultValue
    ) {
      return `${clean},`;
    }
    if (type === "BOOLEAN") {
      return `${clean} = ${defaultValue},`;
    } else if (type === "INSTANCE_SWAP") {
      const node = figma.getNodeById(defaultValue);
      if (definition.optional && node?.name === "undefined") {
        return `${clean},`;
      }
      return node
        ? `${clean} = <${adapter.formatters.capitalizedNameFromName(
            node.name
          )} />,`
        : `${clean} = "${defaultValue}",`;
    } else if (type === "NUMBER") {
      return `${clean}  = ${defaultValue},`;
    } else if (type === "VARIANT") {
      return `${clean} = "${defaultValue}",`;
    } else {
      return `${clean} = "${defaultValue}",`;
    }
  }
}
