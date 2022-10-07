export type FormatSettings = [string | [string, string], 0 | 1][];

export type FormatLanguage = "ts" | "tsx" | "jsx" | "json" | "html" | "vue";

export interface FormatResult {
  label: string;
  items: FormatResultItem[];
}
export interface FormatResultItem {
  label: string;
  language: FormatLanguage;
  lines: string[];
  settings: FormatSettings;
  settingsKey?: string;
}
