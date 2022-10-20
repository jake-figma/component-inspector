import { FormatSettings } from "../shared";

const SETTINGS_STORAGE_KEY = "settings";
const SETTINGS_VERSION = "2";

export async function readSettings(): Promise<FormatSettings> {
  const saved: FormatSettings = await figma.clientStorage.getAsync(
    SETTINGS_STORAGE_KEY
  );
  const initial =
    saved && saved.version === SETTINGS_VERSION
      ? saved
      : {
          version: SETTINGS_VERSION,
          options: {},
        };
  return {
    version: SETTINGS_VERSION,
    options: {
      instance: [
        ["Default", 1],
        ["Boolean", 0],
      ],
      definitionVue: [[["Composition API", "Option API"], 0]],
      ...initial.options,
    },
    tab: initial.tab,
    tabIndex: initial.tabIndex,
  };
}

export async function writeSettings(settings: FormatSettings) {
  return await figma.clientStorage.setAsync(SETTINGS_STORAGE_KEY, settings);
}

type FigmaCommand =
  | "all"
  | "angular"
  | "react"
  | "vue"
  | "web"
  | "json"
  | "config";
const commands: FigmaCommand[] = [
  "all",
  "angular",
  "react",
  "vue",
  "web",
  "json",
  "config",
];

export function isFigmaCommand(
  string: string | FigmaCommand
): string is FigmaCommand {
  return commands.includes(string as FigmaCommand);
}
