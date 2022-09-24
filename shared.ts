export type FormatSettings = [string, 0 | 1][];

export type FormatLanguage = "ts" | "jsx" | "json";

export interface FormatResult {
  label: string;
  language: FormatLanguage;
  lines: string[];
  settings: FormatSettings;
}
