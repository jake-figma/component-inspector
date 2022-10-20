import { adapter } from "./adapter";
import { componentNodesFromSceneNodes } from "./utils";
import { format as formatAngular } from "./formatAngular";
import { format as formatReact } from "./formatReact";
import { format as formatJSON } from "./formatJSON";
import { format as formatVue } from "./formatVue";
import { format as formatWebComponents } from "./formatWebComponents";
import { FormatResult } from "../shared";
import { isFigmaCommand, readSettings, writeSettings } from "./config";

initialize();

async function initialize() {
  figma.showUI(__html__, {
    visible: true,
    width: 500,
    height: 700,
    themeColors: true,
  });

  const settings = await readSettings();

  const nodes: SceneNode[] = [];

  function isFormatResult(
    result: false | FormatResult
  ): result is FormatResult {
    return result !== false;
  }

  function process() {
    const cmd = isFigmaCommand(figma.command) ? figma.command : "all";
    if (cmd === "config") {
      figma.ui.postMessage({
        type: "CONFIG",
        settings,
      });

      return;
    }

    const { instance, definitionVue } = settings.options;
    const relevantNodes = componentNodesFromSceneNodes(nodes);
    const result = adapter(relevantNodes);
    const all = cmd === "all";
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
      tab: settings.tab,
      tabIndex: settings.tabIndex,
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
      if (message.options && message.optionsKey) {
        settings.options[message.optionsKey] = [...message.options];
      }
      writeSettings(settings);
      process();
    }
  };

  figma.on("selectionchange", run);
  run();

  figma.on("documentchange", ({ documentChanges }) => {
    const relevantChange = documentChanges.find(
      (change: DocumentChange) =>
        change.type === "PROPERTY_CHANGE" &&
        ["COMPONENT", "INSTANCE", "COMPONENT_SET"].includes(change.node.type)
    );
    if (relevantChange) run();
  });
}
