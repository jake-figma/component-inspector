import { FormatResult, FormatSettings } from "../shared";
import ComponentAdapter from "./ComponentAdapter";

export function format(
  adapter: ComponentAdapter,
  _settings: FormatSettings
): FormatResult {
  const lines = [JSON.stringify(adapter.json(), null, 2)];
  return { label: "JSON", language: "json", lines, settings: [] };
}
