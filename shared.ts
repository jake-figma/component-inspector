export type FormatSettings = [string | [string, string], 0 | 1][];

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
  settings: FormatSettings;
  settingsKey?: string;
}
