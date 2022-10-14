import {
  FormatResult,
  FormatResultItem,
  FormatSettingsOptions,
} from "../shared";
import { Adapter } from "./adapter";

export function format(adapter: Adapter): FormatResult {
  const shared: FormatResultItem = {
    label: "",
    code: [],
    settings: [],
  };
  const lines = (object: any) => [JSON.stringify(object, null, 2)];
  return {
    label: "JSON",
    items: [
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
    ],
  };
}
