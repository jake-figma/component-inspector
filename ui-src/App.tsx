import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FormatResult, FormatSettings } from "../shared";
import {
  tomorrow as themeDark,
  base16AteliersulphurpoolLight as themeLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import parserHTMLCustom from "./parser-html-custom";
import "./App.css";

const prettierOptionsTS = {
  printWidth: 60,
  parser: "babel-ts",
  plugins: [parserBabel],
  semi: true,
};
const prettierOptionsHTML = {
  printWidth: 60,
  parser: "html",
  plugins: [parserHTMLCustom],
  htmlWhitespaceSensitivity: "ignore",
  bracketSameLine: false,
};

const joiner = (items: string[]) => items.join("\n\n");

const detectLightMode = () =>
  document.documentElement.classList.contains("figma-light");

function App() {
  const [resultsMap, setResultsMap] = useState<{
    [k: string]: FormatResult;
  }>({});
  const [tab, setTab] = useState<string>();
  const [tabIndex, setTabIndex] = useState(0);
  const [theme, setTheme] = useState<{ [key: string]: React.CSSProperties }>(
    detectLightMode() ? themeLight : themeDark
  );

  useEffect(() => {
    window.onmessage = ({
      data: { pluginMessage },
    }: {
      data: {
        pluginMessage: {
          type: "RESULT";
          results: FormatResult[];
          tab?: string;
          tabIndex?: number;
        };
      };
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
              settings: [...item.settings],
              settingsKey: item.settingsKey,
            })),
          };
        });
        setResultsMap(map);
        if (!tab) {
          const initialTab =
            pluginMessage.tab && pluginMessage.tab in resultsMap
              ? pluginMessage.tab
              : Object.values(resultsMap)[0]?.label || "";
          handleTabChange(initialTab, pluginMessage.tabIndex);
        }
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
      sendSettings({ tab: s });
    }
  }

  function handleTabIndexChange(i: number, t?: string) {
    setTabIndex(i);
    sendSettings({ tab: t || tab, tabIndex: i });
  }

  const result = tab ? resultsMap[tab] : null;
  const resultItem = result ? result?.items[tabIndex] : null;

  function sendSettings(
    overrides: {
      settings?: FormatSettings;
      tab?: string;
      tabIndex?: number;
    } = {}
  ) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SETTINGS",
          settingsKey: resultItem?.settingsKey,
          settings: overrides.settings || resultItem?.settings,
          tab: overrides.tab || tab,
          tabIndex:
            overrides.tabIndex === undefined ? tabIndex : overrides.tabIndex,
        },
      },
      "*"
    );
  }

  function renderedResult() {
    if (!resultItem) return null;
    return resultItem.code.map(({ language, lines }) => {
      const lang = language;

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
            prettier.format(lines.join("\n"), prettierOptionsHTML)
          );
        case "vue":
          return renderCode(
            prettier.format(lines.join("\n"), {
              ...prettierOptionsHTML,
            })
          );
        case "angular":
          return renderCode(
            prettier.format(lines.join("\n"), {
              ...prettierOptionsHTML,
              parser: "angular",
            })
          );
        case "json":
          return renderCode(lines.join("\n"));
        case "jsx":
          const jsxString = lines
            .map((line) =>
              prettier.format(line, prettierOptionsTS).replace(/;\n$/, "")
            )
            .join("\n\n");
          return renderCode(jsxString);
        case "ts":
        case "tsx":
          const tsString = joiner(lines);
          return renderCode(prettier.format(tsString, prettierOptionsTS));
      }
    });
  }

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
                onChange={(e) => handleTabIndexChange(parseInt(e.target.value))}
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
            {resultItem.settings.map(([label, value], i) => (
              <button
                className={
                  value || Array.isArray(label) ? "brand small" : "small"
                }
                onClick={() => {
                  const updated = [...resultItem.settings];
                  updated[i][1] = value ? 0 : 1;
                  sendSettings({ settings: updated });
                }}
              >
                {Array.isArray(label) ? label[value] : label}
              </button>
            ))}
          </div>
        ) : null}
      </header>
      <main>{renderedResult()}</main>
    </>
  );
}

export default App;
