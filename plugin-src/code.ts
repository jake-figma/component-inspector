import { ComponentInspector } from "./ComponentInspector";

let EXPLICIT_BOOLEANS = false;
let FIND_TEXT = false;
let SHOW_DEFAULT_VALUES = true;

figma.ui.onmessage = (message) => {
  if (message.type === "PING") {
    const inspector = new ComponentInspector(
      EXPLICIT_BOOLEANS,
      FIND_TEXT,
      SHOW_DEFAULT_VALUES
    );
    const result = inspector.process([...figma.currentPage.selection]);
    figma.ui.postMessage(result);
  } else if (message.type === "SETTINGS") {
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
