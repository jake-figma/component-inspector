export type FormatSettings = [string, 0 | 1][];

export type FormatLanguage = "ts" | "jsx" | "json" | "html";

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
