import { FormatSettings, FormatSettingsScale } from "../shared";

const SETTINGS_STORAGE_KEY = "settings";
const SETTINGS_VERSION = "3";

export function generateBooleans() {
  if (figma.editorType !== "dev") return null;
  return figma.codegen?.preferences?.customSettings?.boolean === "explicit";
}
export function generateComments() {
  if (figma.editorType !== "dev") return true;
  return figma.codegen?.preferences?.customSettings?.comments === "enabled";
}
export function generateDefaults() {
  if (figma.editorType !== "dev") return null;
  return figma.codegen?.preferences?.customSettings?.defaults === "shown";
}

export async function readSettings(): Promise<FormatSettings> {
  const saved: FormatSettings = await figma.clientStorage.getAsync(
    SETTINGS_STORAGE_KEY
  );
  const initial =
    saved && saved.version === SETTINGS_VERSION
      ? saved
      : {
          tab: undefined,
          tabIndex: undefined,
          version: SETTINGS_VERSION,
          options: {},
          prefixIgnore: "",
          suffixSlot: "--SLOT",
          valueOptional: "undefined",
          scale: "sm" as FormatSettingsScale,
        };
  const settings: FormatSettings = {
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
    prefixIgnore: initial.prefixIgnore,
    suffixSlot: initial.suffixSlot,
    valueOptional: initial.valueOptional,
    scale: initial.scale,
  };
  writeSettings(settings);
  return settings;
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
