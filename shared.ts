export type FormatSettingsOptions = [string | [string, string], 0 | 1][];
export type FormatSettings = {
  version: string;
  options: { [k: string]: FormatSettingsOptions };
  tab?: string;
  tabIndex?: number;
  prefixIgnore: string;
  suffixSlot: string;
  valueOptional: string;
};

export type PluginMessageType = "RESULT" | "CONFIG";

interface PluginMessageResult {
  type: Extract<PluginMessageType, "RESULT">;
  results: FormatResult[];
  settings: FormatSettings;
}

interface PluginMessageConfig {
  type: Extract<PluginMessageType, "CONFIG">;
  settings: FormatSettings;
}

export type PluginMessage = PluginMessageResult | PluginMessageConfig;

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
export interface FormatResultItem {
  label: string;
  code: {
    language: FormatLanguage;
    lines: string[];
  }[];
  options: FormatSettingsOptions;
  optionsKey?: string;
}
