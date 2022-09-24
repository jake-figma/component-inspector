import ComponentAdapter from "./ComponentAdapter";
import { componentNodesFromSceneNodes } from "./utils";
import { format as formatJSX } from "./formatJSX";
import { format as formatJSON } from "./formatJSON";
import { format as formatTS } from "./formatTS";
import { FormatLanguage, FormatSettings } from "../shared";

const adapter = new ComponentAdapter();
let lastNodes: SceneNode[] = [];
let SETTINGS: { [K in FormatLanguage]: FormatSettings } = {
  json: [],
  jsx: [
    ["Default", 1],
    ["Bool", 0],
    ["Text", 0],
  ],
  ts: [],
};

function process() {
  adapter.clear();
  const relevantNodes = componentNodesFromSceneNodes(lastNodes);

  relevantNodes.forEach((node) => adapter.add(node));
  const results = [
    formatJSX(adapter, SETTINGS.jsx),
    formatTS(adapter, SETTINGS.ts),
    formatJSON(adapter, SETTINGS.json),
  ];

  figma.ui.postMessage({ type: "RESULT", results });
}

function run() {
  lastNodes = [...figma.currentPage.selection];
  process();
}

figma.ui.onmessage = (message) => {
  if (message.type === "SETTINGS") {
    SETTINGS[message.language as FormatLanguage] = [...message.settings];
    process();
  }
};

figma.showUI(__html__, {
  visible: true,
  width: 450,
  height: Math.ceil(figma.viewport.bounds.height * 0.8),
  themeColors: true,
});

figma.on("nodechange", (e) => {
  if (
    e.nodeChanges.find((n) =>
      ["INSTANCE", "COMPONENT"].includes(figma.getNodeById(n.id)?.type || "")
    )
  ) {
    run();
  }
});

figma.on("selectionchange", run);

run();
