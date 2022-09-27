import { FormatResult, FormatSettings } from "../shared";
import { Adapter } from "./adapter";

export function format(
  adapter: Adapter,
  _settings: FormatSettings
): FormatResult {
  const lines = [JSON.stringify(adapter, null, 2)];
  return { label: "JSON", language: "json", lines, settings: [] };
}
