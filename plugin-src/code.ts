import { adapter } from "./adapter";
import { componentNodesFromSceneNodes } from "./utils";
import { format as formatAngular } from "./formatAngular";
import { format as formatReact } from "./formatReact";
import { format as formatJSON } from "./formatJSON";
import { format as formatVue } from "./formatVue";
import { format as formatWebComponents } from "./formatWebComponents";
import { FormatLanguage, FormatResult, PluginMessage } from "../shared";
import { isFigmaCommand, readSettings, writeSettings } from "./config";

if (figma.mode === "codegen") {
  initializeCodegen();
} else {
  initialize();
}

async function initializeCodegen() {
  let watching: { [id: string]: boolean } = {};
  figma.codegen.on("generate", (event) => {
    const { node } = event;
    const main = "mainComponent" in node ? node.mainComponent : null;
    const parent = node.parent;
    watching = {};
    switch (node.type) {
      case "INSTANCE":
        watching[node.id] = true;
        if (main) watching[main.id] = true;
        if (main?.parent) watching[main.parent.id] = true;
        break;
      case "COMPONENT":
        watching[node.id] = true;
        if (parent) watching[parent.id] = true;
        break;
      case "COMPONENT_SET":
        watching[node.id] = true;
        break;
    }
    return runCodegen(event);
  });
  figma.on("documentchange", ({ documentChanges }) => {
    if (documentChanges.find(({ id }) => watching[id])) {
      figma.codegen.refresh();
    }
  });
  figma.codegen.on("preferenceschange", async (event) => {
    if (event.propertyName === "settings") {
      figma.showUI(__html__, {
        visible: true,
        width: 500,
        height: 500,
        themeColors: true,
      });
      const settings = await readSettings();
      const message: PluginMessage = {
        type: "CONFIG",
        settings,
        codegen: true,
      };
      figma.ui.postMessage(message);
      figma.ui.onmessage = async (message) => {
        if (message.type === "SETTINGS") {
          settings.prefixIgnore = message.settings.prefixIgnore;
          settings.suffixSlot = message.settings.suffixSlot;
          settings.valueOptional = message.settings.valueOptional;
          settings.scale = message.settings.scale;
          writeSettings(settings);
        }
      };
    }
  });
}

// defaulting to angular because due to a bug, the default language is missing when run from search panel
async function runCodegen({
  node,
  language,
}: CodegenEvent): Promise<CodegenResult[]> {
  const settings = await readSettings();
  const relevantNodes = componentNodesFromSceneNodes([node]);
  return new Promise((resolve, reject) => {
    if (!relevantNodes.length) {
      return resolve([
        {
          title: "Component Inspector",
          code: "Select a component",
          language: "PLAINTEXT",
        },
      ]);
    }
    language = language || "angular";
    settings.singleNode = true;
    const result = adapter(relevantNodes, settings);
    const things = [];
    if (language === "angular") {
      things.push(formatAngular(result, settings));
    } else if (language === "react") {
      things.push(formatReact(result, settings));
    } else if (language === "vue-composition") {
      settings.options.definitionVue[0][1] = 0;
      writeSettings(settings);
      things.push(formatVue(result, settings));
    } else if (language === "vue-options") {
      settings.options.definitionVue[0][1] = 1;
      writeSettings(settings);
      things.push(formatVue(result, settings));
    } else if (language === "json") {
      things.push(formatJSON(result, settings));
    } else if (language === "web") {
      things.push(formatWebComponents(result, settings));
    }
    const readyToFormat: {
      lines: string[];
      language: string;
      title: string;
    }[] = [];
    things.forEach(({ label, items }) => {
      items.forEach(({ label: itemLabel, code }) => {
        code.forEach(({ label, language, lines }) => {
          readyToFormat.push({
            lines,
            language,
            title: itemLabel + (label ? `: ${label}` : ""),
          });
        });
      });
    });
    let promiseCount = readyToFormat.length;
    const results: CodegenResult[] = [];
    figma.showUI(__html__, { visible: false });
    figma.ui.onmessage = (message) => {
      if (message.type === "FORMAT_RESULT") {
        const item = readyToFormat[message.index];
        const result: CodegenResult = {
          title: item.title,
          code: message.result,
          language: ["vue", "angular", "html", "jsx"].includes(item.language)
            ? "HTML"
            : item.language === "json"
            ? "JSON"
            : "TYPESCRIPT",
        };
        results.push(result);
        promiseCount--;
        if (promiseCount <= 0) {
          resolve(results);
        }
      }
    };
    if (promiseCount === 0) {
      return resolve([]);
    }

    readyToFormat.forEach(({ lines, language }, index) => {
      const message: PluginMessage = {
        type: "FORMAT",
        lines,
        language: language as FormatLanguage,
        index,
      };
      figma.ui.postMessage(message);
    });
  });
}

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
      const message: PluginMessage = { type: "CONFIG", settings };
      figma.ui.postMessage(message);

      return;
    }

    const relevantNodes = componentNodesFromSceneNodes(nodes);
    const result = adapter(relevantNodes, settings);
    const all = cmd === "all";
    const results = [
      (all || cmd === "angular") && formatAngular(result, settings),
      (all || cmd === "react") && formatReact(result, settings),
      (all || cmd === "vue") && formatVue(result, settings),
      (all || cmd === "web") && formatWebComponents(result, settings),
      (all || cmd === "json") && formatJSON(result, settings),
    ].filter(isFormatResult);

    const message: PluginMessage = {
      type: "RESULT",
      results,
      settings,
    };
    figma.ui.postMessage(message);
  }

  function run() {
    nodes.splice(0, nodes.length);
    figma.currentPage.selection.forEach((node) => nodes.push(node));
    process();
  }

  figma.ui.onmessage = async (message) => {
    if (message.type === "OPTIONS") {
      settings.tab = message.tab;
      settings.tabIndex = message.tabIndex;
      if (message.options && message.optionsKey) {
        settings.options[message.optionsKey] = [...message.options];
      }
      writeSettings(settings);
      process();
    } else if (message.type === "SETTINGS") {
      settings.prefixIgnore = message.settings.prefixIgnore;
      settings.suffixSlot = message.settings.suffixSlot;
      settings.valueOptional = message.settings.valueOptional;
      settings.scale = message.settings.scale;
      console.log(settings);
      writeSettings(settings);
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
