import { FormatResult, FormatResultItem, FormatSettings } from "../shared";
import { Adapter } from "./adapter";

export function format(adapter: Adapter): FormatResult {
  const shared: FormatResultItem = {
    label: "",
    lines: [],
    language: "json",
    settings: [],
  };
  const lines = (object: any) => [JSON.stringify(object, null, 2)];
  return {
    label: "JSON",
    items: [
      {
        ...shared,
        label: "All",
        lines: lines(adapter),
      },
      {
        ...shared,
        label: "Definitions",
        lines: lines(adapter.definitions),
      },
      {
        ...shared,
        label: "Components",
        lines: lines(adapter.components),
      },
      {
        ...shared,
        label: "References",
        lines: lines(adapter.references),
      },
      {
        ...shared,
        label: "Metas",
        lines: lines(adapter.metas),
      },
    ],
  };
}
