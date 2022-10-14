import { adapter } from "./adapter";
import { componentNodesFromSceneNodes } from "./utils";
import { format as formatAngular } from "./formatAngular";
import { format as formatReact } from "./formatReact";
import { format as formatJSON } from "./formatJSON";
import { format as formatVue } from "./formatVue";
import { format as formatWebComponents } from "./formatWebComponents";
import { FormatResult, FormatSettings, FormatSettingsOptions } from "../shared";

initialize();

async function initialize() {
  figma.showUI(__html__, {
    visible: true,
    width: 550,
    height: 900,
    themeColors: true,
  });

  const settingsFromStorage: FormatSettings =
    await figma.clientStorage.getAsync("settings");

  const settingsVersion = "1";

  const initialSettings =
    settingsFromStorage && settingsFromStorage.version === settingsVersion
      ? settingsFromStorage
      : {
          version: settingsVersion,
          options: {},
        };
  const settings: FormatSettings = {
    version: settingsVersion,
    options: {
      instance: [
        ["Default", 1],
        ["Boolean", 0],
      ],
      definitionVue: [[["Composition API", "Option API"], 0]],
      ...initialSettings.options,
    },
  };

  const nodes: SceneNode[] = [];

  type FigmaCommand = "all" | "angular" | "react" | "vue" | "web" | "json";
  const commands: FigmaCommand[] = [
    "all",
    "angular",
    "react",
    "vue",
    "web",
    "json",
  ];

  function isFigmaCommand(
    string: string | FigmaCommand
  ): string is FigmaCommand {
    return commands.includes(string as FigmaCommand);
  }

  function isFormatResult(
    result: false | FormatResult
  ): result is FormatResult {
    return result !== false;
  }

  function process() {
    const relevantNodes = componentNodesFromSceneNodes(nodes);
    const result = adapter(relevantNodes);
    const cmd = isFigmaCommand(figma.command) ? figma.command : "all";
    const all = cmd === "all";
    const { instance, definitionVue } = settings.options;
    const results = [
      (all || cmd === "angular") && formatAngular(result, instance),
      (all || cmd === "react") && formatReact(result, instance),
      (all || cmd === "vue") && formatVue(result, definitionVue, instance),
      (all || cmd === "web") && formatWebComponents(result, instance),
      (all || cmd === "json") && formatJSON(result),
    ].filter(isFormatResult);

    figma.ui.postMessage({
      type: "RESULT",
      results,
      tab: initialSettings.tab,
      tabIndex: initialSettings.tabIndex,
    });
  }

  function run() {
    nodes.splice(0, nodes.length);
    figma.currentPage.selection.forEach((node) => nodes.push(node));
    process();
  }

  figma.ui.onmessage = async (message) => {
    if (message.type === "SETTINGS") {
      settings.tab = message.tab;
      settings.tabIndex = message.tabIndex;
      if (message.settings && message.settingsKey) {
        settings.options[message.settingsKey] = [...message.settings];
      }
      await figma.clientStorage.setAsync("settings", settings);
      process();
    }
  };

  // @ts-ignore
  figma.on("documentchange", ({ documentChanges }) => {
    const relevantChange = documentChanges.find(
      // @ts-ignore
      (change: DocumentChange) =>
        change.type === "PROPERTY_CHANGE" &&
        ["COMPONENT", "INSTANCE", "COMPONENT_SET"].includes(change.node.type)
    );
    if (relevantChange) run();
  });

  figma.on("selectionchange", run);
  run();
}
