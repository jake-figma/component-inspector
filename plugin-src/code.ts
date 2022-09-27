import { adapter } from "./adapter";
import {
  componentNodesFromSceneNodes,
  nodeChangesIncludesComponents,
} from "./utils";
import { format as formatJSX } from "./formatJSX";
import { format as formatJSON } from "./formatJSON";
import { format as formatTS } from "./formatTS";
import { FormatLanguage, FormatResult, FormatSettings } from "../shared";

const SETTINGS: { [K in FormatLanguage]: FormatSettings } = {
  json: [],
  ts: [],
  jsx: [
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
    formatJSX(processed, SETTINGS.jsx),
    formatTS(processed, SETTINGS.ts),
    formatJSON(processed, SETTINGS.json),
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
    SETTINGS[message.language as FormatLanguage] = [...message.settings];
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
