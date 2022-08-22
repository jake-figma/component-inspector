import { ComponentInspector } from "./ComponentInspector";

let EXPLICIT_BOOLEANS = false;
let FIND_TEXT = false;
let SHOW_DEFAULT_VALUES = true;

function run() {
  const inspector = new ComponentInspector(
    EXPLICIT_BOOLEANS,
    FIND_TEXT,
    SHOW_DEFAULT_VALUES
  );
  const result = inspector.process([...figma.currentPage.selection]);
  figma.ui.postMessage(result);
}

figma.ui.onmessage = (message) => {
  if (message.type === "SETTINGS") {
    EXPLICIT_BOOLEANS = message.explicitBooleans;
    FIND_TEXT = message.findText;
    SHOW_DEFAULT_VALUES = message.showDefaultValues;
  }
};

figma.showUI(__html__, {
  visible: true,
  width: 600,
  height: 1150,
  themeColors: true,
});

figma.on("selectionchange", run);

run();
