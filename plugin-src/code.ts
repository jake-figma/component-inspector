import { adapter } from "./adapter";
import { componentNodesFromSceneNodes } from "./utils";
import { format as formatAngular } from "./formatAngular";
import { format as formatReact } from "./formatReact";
import { format as formatJSON } from "./formatJSON";
import { format as formatVue } from "./formatVue";
import { format as formatWebComponents } from "./formatWebComponents";
import { FormatResult, FormatSettings } from "../shared";

initialize();

async function initialize() {
  figma.showUI(__html__, {
    visible: true,
    width: 550,
    height: 900,
    themeColors: true,
  });

  const initialSettings = (await figma.clientStorage.getAsync("settings")) || {
    options: {},
  };
  const settings: {
    tab?: string;
    tabIndex?: number;
    options: { [k: string]: FormatSettings };
  } = {
    options: {
      instance: [
        ["Default", 1],
        ["Boolean", 0],
      ],
      vueDefinition: [[["Composition API", "Option API"], 0]],
      ...initialSettings.options,
    },
  };

  const nodes: SceneNode[] = [];

  function process() {
    const relevantNodes = componentNodesFromSceneNodes(nodes);
    const processed = adapter(relevantNodes);
    const results: FormatResult[] = [];
    const { command } = figma;
    if (command === "all" || command === "angular")
      results.push(formatAngular(processed, settings.options.instance));
    if (command === "all" || command === "react")
      results.push(formatReact(processed, settings.options.instance));
    if (command === "all" || command === "vue")
      results.push(
        formatVue(
          processed,
          settings.options.vueDefinition,
          settings.options.instance
        )
      );
    if (command === "all" || command === "web")
      results.push(formatWebComponents(processed, settings.options.instance));
    if (command === "all" || command === "json")
      results.push(formatJSON(processed));

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
        ["COMPONENT", "INSTANCE"].includes(change.node.type)
    );
    if (relevantChange) run();
  });

  figma.on("selectionchange", run);
  run();
}
