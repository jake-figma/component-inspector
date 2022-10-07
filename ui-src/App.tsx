import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FormatResult, FormatSettings } from "../shared";
import {
  tomorrow as themeDark,
  base16AteliersulphurpoolLight as themeLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import parserHTML from "prettier/esm/parser-html.mjs";
import "./App.css";

const prettierOptionsTS = {
  printWidth: 50,
  parser: "babel-ts",
  plugins: [parserBabel],
  semi: true,
};
const prettierOptionsHTML = {
  printWidth: 40,
  parser: "html",
  plugins: [parserHTML],
  htmlWhitespaceSensitivity: "ignore",
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
      data: {
        pluginMessage: { type, results },
      },
    }: {
      data: { pluginMessage: { type: "RESULT"; results: FormatResult[] } };
    }) => {
      if (type === "RESULT") {
        const map = { ...resultsMap };
        results.forEach((result) => {
          map[result.label] = {
            label: result.label,
            items: result.items.map((item) => ({
              language: item.language,
              label: item.label,
              settings: [...item.settings],
              settingsKey: item.settingsKey,
              lines: [...item.lines],
            })),
          };
        });
        setResultsMap(map);
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
  }, []);

  useEffect(() => {
    if (!tab) {
      const value = Object.values(resultsMap)[0];
      if (value) {
        handleTabChange(value.label);
      }
    }
  }, [resultsMap, tab, handleTabChange]);

  function handleTabChange(s: string) {
    setTab(s);
    if (!Boolean(resultsMap[s].items[tabIndex])) {
      handleTabIndexChange(0);
    }
  }

  function handleTabIndexChange(i: number) {
    setTabIndex(i);
  }

  const result = tab ? resultsMap[tab] : null;
  const resultItem = result ? result.items[tabIndex] : null;

  function sendSettings(settings: FormatSettings) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SETTINGS",
          settingsKey: resultItem?.settingsKey,
          settings,
        },
      },
      "*"
    );
  }

  function renderedResult() {
    if (!resultItem) return null;
    const lang = resultItem.language;

    const renderCode = (text: string) => (
      <SyntaxHighlighter
        customStyle={{ margin: 0 }}
        language={lang === "vue" ? "tsx" : lang}
        style={theme}
      >
        {text}
      </SyntaxHighlighter>
    );

    switch (lang) {
      case "html":
      case "vue":
        return renderCode(
          prettier.format(resultItem.lines.join("\n"), prettierOptionsHTML)
        );
      case "json":
        return renderCode(resultItem.lines.join("\n"));
      case "jsx":
        const jsxString =
          resultItem.lines.length > 1
            ? `<>${joiner(resultItem.lines)}</>`
            : joiner(resultItem.lines);
        return renderCode(
          prettier.format(jsxString, prettierOptionsTS).replace(/;\n$/, "")
        );
      case "ts":
      case "tsx":
        const tsString = joiner(resultItem.lines);
        return renderCode(prettier.format(tsString, prettierOptionsTS));
    }
  }

  return (
    <>
      <header>
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
          &nbsp;
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
                  sendSettings(updated);
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
