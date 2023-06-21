export type FormatSettingsOptions = [string | [string, string], 0 | 1][];
export type FormatSettingsScale = "sm" | "md" | "lg";
export type FormatSettings = {
  version: string;
  options: { [k: string]: FormatSettingsOptions };
  singleNode?: boolean;
  tab?: string;
  tabIndex?: number;
  prefixIgnore: string;
  scale: FormatSettingsScale;
  suffixSlot: string;
  valueOptional: string;
};

export type PluginMessageType = "RESULT" | "CONFIG" | "FORMAT";

interface PluginMessageResult {
  type: Extract<PluginMessageType, "RESULT">;
  results: FormatResult[];
  settings: FormatSettings;
}
interface PluginMessageFormat {
  type: Extract<PluginMessageType, "FORMAT">;
  language: FormatLanguage;
  lines: string[];
  index: number;
}

interface PluginMessageConfig {
  type: Extract<PluginMessageType, "CONFIG">;
  settings: FormatSettings;
  codegen?: boolean;
}

export type PluginMessage =
  | PluginMessageResult
  | PluginMessageConfig
  | PluginMessageFormat;

export type FormatLanguage =
  | "angular"
  | "ts"
  | "tsx"
  | "jsx"
  | "json"
  | "html"
  | "vue";

export interface FormatResult {
  label: string;
  items: FormatResultItem[];
}
export interface FormatResultItemCode {
  label?: string;
  language: FormatLanguage;
  lines: string[];
}
export interface FormatResultItem {
  label: string;
  code: FormatResultItemCode[];
  options: FormatSettingsOptions;
  optionsKey?: string;
}
