import { adapter } from "./adapter";
import {
  componentNodesFromSceneNodes,
  nodeChangesIncludesComponents,
} from "./utils";
import { format as formatAngular } from "./formatAngular";
import { format as formatReact } from "./formatReact";
import { format as formatJSON } from "./formatJSON";
import { format as formatVue } from "./formatVue";
import { format as formatWebComponents } from "./formatWebComponents";
import { FormatResult, FormatSettings } from "../shared";

const SETTINGS: { [k: string]: FormatSettings } = {
  reactInstance: [
    ["Default", 1],
    ["Bool", 0],
    ["Text", 0],
  ],
};
const nodes: SceneNode[] = [];

function process() {
  const relevantNodes = componentNodesFromSceneNodes(nodes);
  const processed = adapter(relevantNodes);
  const results: FormatResult[] = [];
  const { command } = figma;
  if (command === "all" || command === "angular")
    results.push(formatAngular(processed));
  if (command === "all" || command === "react")
    results.push(formatReact(processed, SETTINGS.reactInstance));
  if (command === "all" || command === "vue")
    results.push(formatVue(processed));
  if (command === "all" || command === "web")
    results.push(formatWebComponents(processed));
  if (command === "all" || command === "json")
    results.push(formatJSON(processed));

  figma.ui.postMessage({ type: "RESULT", results });
}

function run() {
  nodes.splice(0, nodes.length);
  figma.currentPage.selection.forEach((node) => nodes.push(node));
  process();
}

figma.showUI(__html__, {
  visible: true,
  width: 500,
  height: 900,
  themeColors: true,
});

figma.ui.onmessage = (message) => {
  if (message.type === "SETTINGS") {
    SETTINGS[message.settingsKey] = [...message.settings];
    process();
  }
};

figma.on("nodechange", (e) => {
  if (nodeChangesIncludesComponents(e.nodeChanges)) {
    run();
  }
});
figma.on("selectionchange", run);
run();
