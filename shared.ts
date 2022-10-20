export type FormatSettingsOptions = [string | [string, string], 0 | 1][];
export type FormatSettings = {
  version: string;
  options: { [k: string]: FormatSettingsOptions };
  tab?: string;
  tabIndex?: number;
};

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
