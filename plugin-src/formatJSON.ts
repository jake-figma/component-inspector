import { FormatResult, FormatResultItem, FormatSettings } from "../shared";
import { Adapter } from "./adapter";

export function format(
  adapter: Adapter,
  settings: FormatSettings
): FormatResult {
  const shared: FormatResultItem = {
    label: "",
    code: [],
    options: [],
  };
  const lines = (object: any) => [JSON.stringify(object, null, 2)];
  const items: FormatResultItem[] = settings.singleNode
    ? [
        {
          ...shared,
          label: "Component Inspector JSON Schema",
          code: [{ language: "json", lines: lines(adapter) }],
        },
      ]
    : [
        {
          ...shared,
          label: "All",
          code: [{ language: "json", lines: lines(adapter) }],
        },
        {
          ...shared,
          label: "Definitions",
          code: [{ language: "json", lines: lines(adapter.definitions) }],
        },
        {
          ...shared,
          label: "Components",
          code: [{ language: "json", lines: lines(adapter.components) }],
        },
        {
          ...shared,
          label: "References",
          code: [{ language: "json", lines: lines(adapter.references) }],
        },
        {
          ...shared,
          label: "Metas",
          code: [{ language: "json", lines: lines(adapter.metas) }],
        },
      ];
  return {
    label: "JSON",
    items,
  };
}
