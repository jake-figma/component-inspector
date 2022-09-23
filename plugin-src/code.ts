import { ComponentInspector } from "./ComponentInspector";

let EXPLICIT_BOOLEANS = false;
let FIND_TEXT = false;
let SHOW_DEFAULT_VALUES = true;

let lastNodes: SceneNode[] = [];

function runOverNodes() {
  const inspector = new ComponentInspector(
    EXPLICIT_BOOLEANS,
    FIND_TEXT,
    SHOW_DEFAULT_VALUES
  );
  const result = inspector.process(lastNodes);
  figma.ui.postMessage({ type: "RESULT", ...result });
}

function run() {
  lastNodes = [...figma.currentPage.selection];
  runOverNodes();
}

figma.ui.onmessage = (message) => {
  if (message.type === "SETTINGS") {
    EXPLICIT_BOOLEANS = message.explicitBooleans;
    FIND_TEXT = message.findText;
    SHOW_DEFAULT_VALUES = message.showDefaultValues;
    runOverNodes();
  }
};

figma.showUI(__html__, {
  visible: true,
  width: 600,
  height: 600,
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
