import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  FormatLanguage,
  FormatResult,
  FormatSettings,
  FormatSettingsOptions,
  FormatSettingsScale,
  PluginMessage,
  PluginMessageType,
} from "../shared";
import {
  tomorrow as themeDark,
  base16AteliersulphurpoolLight as themeLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import parserHTMLCustom from "./parser-html-custom";
import "./App.css";

const printWidthForScale = (scale: FormatSettingsScale) =>
  scale === "sm" ? 60 : scale === "md" ? 50 : 30;

const prettierOptionsTS = (scale: FormatSettingsScale) => ({
  printWidth: printWidthForScale(scale),
  parser: "babel-ts",
  plugins: [parserBabel],
  semi: true,
});
const prettierOptionsHTML = (scale: FormatSettingsScale) => ({
  printWidth: printWidthForScale(scale),
  parser: "html",
  plugins: [parserHTMLCustom],
  htmlWhitespaceSensitivity: "ignore",
  bracketSameLine: false,
});

const joiner = (items: string[]) => items.join("\n\n");

const detectLightMode = () =>
  document.documentElement.classList.contains("figma-light");

function App() {
  const [mode, setMode] = useState<PluginMessageType>("RESULT");
  const [settings, setSettings] = useState<FormatSettings>();
  const [resultsMap, setResultsMap] = useState<{
    [k: string]: FormatResult;
  }>({});
  const [scale, setScale] = useState<FormatSettingsScale>("sm");
  const [tab, setTab] = useState<string>();
  const [tabIndex, setTabIndex] = useState(0);
  const [theme, setTheme] = useState<{ [key: string]: React.CSSProperties }>(
    detectLightMode() ? themeLight : themeDark
  );

  useEffect(() => {
    window.onmessage = ({
      data: { pluginMessage },
    }: {
      data: { pluginMessage: PluginMessage };
    }) => {
      if (pluginMessage.type === "RESULT") {
        const map = { ...resultsMap };
        pluginMessage.results.forEach((result) => {
          map[result.label] = {
            label: result.label,
            items: result.items.map((item) => ({
              code: [
                ...item.code.map(({ language, lines }) => ({
                  language,
                  lines: [...lines],
                })),
              ],
              label: item.label,
              options: [...item.options],
              optionsKey: item.optionsKey,
            })),
          };
        });
        setResultsMap(map);
        const { settings } = pluginMessage;
        if (!tab) {
          const initialTab =
            settings.tab && settings.tab in map
              ? settings.tab
              : Object.values(map)[0]?.label || "";
          handleTabChange(initialTab, settings.tabIndex);
        }
        setScale(settings.scale);
      } else if (pluginMessage.type === "CONFIG") {
        setMode("CONFIG");
        setSettings(pluginMessage.settings);
      }
    };

    const stylesheet = document.getElementById(
      "figma-style"
    ) as HTMLStyleElement;

    if (stylesheet) {
      setTheme(detectLightMode() ? themeLight : themeDark);
      const observer = new MutationObserver(() => {
        setTheme(detectLightMode() ? themeLight : themeDark);
      });
      observer.observe(stylesheet, { childList: true });
    }
  }, [tab, resultsMap, handleTabChange, setTheme]);

  function handleTabChange(s: string, index?: number) {
    setTab(s);
    if (index !== undefined) {
      handleTabIndexChange(index, s);
    } else if (!Boolean(resultsMap[s]?.items[tabIndex])) {
      handleTabIndexChange(0, s);
    } else {
      sendOptions({ tab: s });
    }
  }

  function handleTabIndexChange(i: number, t?: string) {
    setTabIndex(i);
    sendOptions({ tab: t || tab, tabIndex: i });
  }

  const result = tab ? resultsMap[tab] : null;
  const resultItem = result ? result?.items[tabIndex] : null;

  function sendOptions(
    overrides: {
      options?: FormatSettingsOptions;
      tab?: string;
      tabIndex?: number;
    } = {}
  ) {
    const pluginMessage = {
      type: "OPTIONS",
      optionsKey: resultItem?.optionsKey,
      options: overrides.options || resultItem?.options,
      tab: overrides.tab || tab,
      tabIndex:
        overrides.tabIndex === undefined ? tabIndex : overrides.tabIndex,
    };
    parent.postMessage({ pluginMessage }, "*");
  }

  function updateSettings(settings: FormatSettings) {
    setSettings(settings);
    const pluginMessage = {
      type: "SETTINGS",
      settings,
    };
    parent.postMessage({ pluginMessage }, "*");
  }

  function renderedResult() {
    if (!resultItem) return null;

    return resultItem.code.map(({ language, lines }) => {
      const lang: FormatLanguage = language;

      const renderCode = (text: string) => (
        <SyntaxHighlighter
          customStyle={{ margin: 0 }}
          language={lang === "vue" ? "tsx" : lang === "angular" ? "html" : lang}
          style={theme}
        >
          {text}
        </SyntaxHighlighter>
      );

      switch (lang) {
        case "html":
          return renderCode(
            prettier.format(lines.join("\n"), prettierOptionsHTML(scale))
          );
        case "vue":
          return renderCode(
            prettier.format(lines.join("\n"), {
              ...prettierOptionsHTML(scale),
            })
          );
        case "angular":
          return renderCode(
            prettier.format(lines.join("\n"), {
              ...prettierOptionsHTML(scale),
              parser: "angular",
            })
          );
        case "json":
          return renderCode(lines.join("\n"));
        case "jsx":
          const jsxString = lines
            .map((line) =>
              prettier
                .format(line, prettierOptionsTS(scale))
                .replace(/;\n$/, "")
            )
            .join("\n\n");
          return renderCode(jsxString);
        case "ts":
        case "tsx":
          const tsString = joiner(lines);
          return renderCode(
            prettier.format(tsString, prettierOptionsTS(scale))
          );
      }
    });
  }

  function renderResults() {
    return (
      <>
        <header>
          {tab ? (
            <div>
              {Object.keys(resultsMap).length > 1 ? (
                <select onChange={(e) => handleTabChange(e.target.value)}>
                  {Object.values(resultsMap).map(({ label }) => (
                    <option key={label} selected={tab === label}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <h3>{tab}</h3>
              )}
              {result ? (
                <select
                  onChange={(e) =>
                    handleTabIndexChange(parseInt(e.target.value))
                  }
                >
                  {result.items.map(({ label }, i) => (
                    <option key={label} selected={tabIndex === i} value={i}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ) : null}
          {resultItem ? (
            <div>
              {resultItem.options.map(([label, value], i) => (
                <button
                  className={
                    value || Array.isArray(label) ? "brand small" : "small"
                  }
                  onClick={() => {
                    const updated = [...resultItem.options];
                    updated[i][1] = value ? 0 : 1;
                    sendOptions({ options: updated });
                  }}
                >
                  {Array.isArray(label) ? label[value] : label}
                </button>
              ))}
            </div>
          ) : null}
        </header>
        <main
          style={{
            fontSize: scale === "lg" ? 20 : scale === "md" ? 16 : 12,
          }}
        >
          {renderedResult()}
        </main>
      </>
    );
  }

  function renderConfig() {
    return settings ? (
      <main className="padded">
        <div>
          <h2>Ignored Property Prefix</h2>
          <p>
            If present, properties with this prefix will be ignored from code
            generation.
          </p>
          <input
            type="text"
            value={settings.prefixIgnore}
            onInput={(e) =>
              updateSettings({
                ...settings,
                prefixIgnore: e.currentTarget.value.trim(),
              })
            }
            placeholder="Your prefix here"
          />
        </div>
        <div>
          <h2>Text Property Slot Suffix</h2>
          <p>
            If present, text properties named with this suffix will be treated
            as a <code>&lt;span&gt;</code> slot. Appending{" "}
            <code>[tagname]</code> to this suffix in the text property name will
            control which html tag is used, eg{" "}
            <code>{settings.suffixSlot || "YOUR-SUFFIX"}[h1]</code>.
          </p>
          <input
            type="text"
            value={settings.suffixSlot}
            onInput={(e) =>
              updateSettings({
                ...settings,
                suffixSlot: e.currentTarget.value.trim(),
              })
            }
            placeholder="Your slot suffix here"
          />
        </div>
        <div>
          <h2>Optional Variant and Instance Default Name</h2>
          <p>
            If present, variant properties with a default of{" "}
            {settings.valueOptional ? (
              <code>"{settings.valueOptional}"</code>
            ) : (
              "this value"
            )}{" "}
            and instance swap properties with a default instance named{" "}
            {settings.valueOptional ? (
              <code>"{settings.valueOptional}"</code>
            ) : (
              "this value"
            )}{" "}
            will be treated as optional.
          </p>
          <input
            type="text"
            value={settings.valueOptional}
            onInput={(e) =>
              updateSettings({
                ...settings,
                valueOptional: e.currentTarget.value.trim(),
              })
            }
            placeholder="Optional value"
          />
        </div>
        <div>
          <h2>Scale</h2>
          <p>Code scaling</p>
          <select
            value={settings.scale}
            onChange={(e) => {
              updateSettings({
                ...settings,
                scale: e.currentTarget.value as FormatSettingsScale,
              });
            }}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
      </main>
    ) : null;
  }

  return mode === "RESULT" ? renderResults() : renderConfig();
}

export default App;
