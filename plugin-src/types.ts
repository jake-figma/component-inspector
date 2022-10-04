export type SafePropertyReferencesMap = {
  instances: {
    [k: string]: { visible?: string; characters?: string };
  };
  properties: {
    [k: string]: { visible?: boolean; characters?: boolean };
  };
};

export type SafePropertyDefinitionMetaMap = {
  [k: string]: { name: string; id: string };
};

export type SafeComponentMap = {
  [k: string]: SafeComponent;
};

export type SafePropertyDefinitionsMap = {
  [k: string]: SafePropertyDefinitions;
};

export type SafePropertyDefinitions = {
  [k: string]: SafePropertyDefinition;
};

export type SafeProperties = {
  [k: string]: SafeProperty;
};

export type SafeType =
  | "BOOLEAN"
  | "EXPLICIT"
  | "INSTANCE_SWAP"
  | "NUMBER"
  | "TEXT"
  | "VARIANT";

interface SafePropertyDefinitionBoolean {
  type: Extract<SafeType, "BOOLEAN">;
  defaultValue: boolean;
}
interface SafePropertyDefinitionExplicit {
  type: Extract<SafeType, "EXPLICIT">;
  defaultValue: string | number | boolean;
}
interface SafePropertyDefinitionNumber {
  type: Extract<SafeType, "NUMBER">;
  defaultValue: number;
}
interface SafePropertyDefinitionString {
  type: Extract<SafeType, "INSTANCE_SWAP" | "TEXT">;
  defaultValue: string;
}
interface SafePropertyDefinitionVariant {
  type: Extract<SafeType, "VARIANT">;
  defaultValue: string | number;
  variantOptions: string[] | number[];
}

interface SafePropertyBoolean {
  type: Extract<SafeType, "BOOLEAN">;
  value: boolean;
}
interface SafePropertyExplicit {
  type: Extract<SafeType, "EXPLICIT">;
  value: string | number | boolean;
}
interface SafePropertyNumber {
  type: Extract<SafeType, "NUMBER">;
  value: number;
}
interface SafePropertyString {
  type: Extract<SafeType, "INSTANCE_SWAP" | "TEXT">;
  value: string;
}
interface SafePropertyVariant {
  type: Extract<SafeType, "VARIANT">;
  value: string | number;
}

export type SafePropertyDefinition = { name: string } & (
  | SafePropertyDefinitionBoolean
  | SafePropertyDefinitionExplicit
  | SafePropertyDefinitionNumber
  | SafePropertyDefinitionString
  | SafePropertyDefinitionVariant
);

export type SafeProperty = { name: string; default: boolean } & (
  | SafePropertyBoolean
  | SafePropertyExplicit
  | SafePropertyNumber
  | SafePropertyString
  | SafePropertyVariant
);

export interface SafeComponent {
  id: string;
  name: string;
  definition: string;
  properties: SafeProperties;
}