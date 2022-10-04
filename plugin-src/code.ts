import { adapter } from "./adapter";
import {
  componentNodesFromSceneNodes,
  nodeChangesIncludesComponents,
} from "./utils";
import { format as formatAngular } from "./formatAngular";
import { format as formatReact } from "./formatReact";
import { format as formatJSON } from "./formatJSON";
import { FormatLanguage, FormatResult, FormatSettings } from "../shared";

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
  const results: FormatResult[] = [
    formatReact(processed, SETTINGS.reactInstance),
    formatAngular(processed),
    formatJSON(processed),
  ];

  figma.ui.postMessage({ type: "RESULT", results });
}

function run() {
  nodes.splice(0, nodes.length);
  figma.currentPage.selection.forEach((node) => nodes.push(node));
  process();
}

figma.showUI(__html__, {
  visible: true,
  width: 450,
  height: Math.ceil(figma.viewport.bounds.height * 0.8),
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
