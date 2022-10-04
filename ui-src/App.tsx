import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FormatLanguage, FormatResult, FormatSettings } from "../shared";
import {
  tomorrow as themeDark,
  materialLight as themeLight,
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
        setTab(value.label);
      }
    }
  }, [resultsMap, tab, setTab]);

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

    const renderCode = (text: string) => (
      <SyntaxHighlighter
        customStyle={{ margin: 0 }}
        language={resultItem?.language}
        style={theme}
      >
        {text}
      </SyntaxHighlighter>
    );

    switch (resultItem.language) {
      case "html":
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
        const tsString = joiner(resultItem.lines);
        return renderCode(prettier.format(tsString, prettierOptionsTS));
    }
  }

  function handleTabChange(s: string) {
    setTab(s);
    setTabIndex(0);
  }

  return (
    <>
      <header>
        <div>
          <select onChange={(e) => handleTabChange(e.target.value)}>
            {Object.values(resultsMap).map(({ label }) => (
              <option key={label} selected={tab === label}>
                {label}
              </option>
            ))}
          </select>
          {result ? (
            <select onChange={(e) => setTabIndex(parseInt(e.target.value))}>
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
                className={value ? "brand small" : "small"}
                onClick={() => {
                  const updated = [...resultItem.settings];
                  updated[i][1] = value ? 0 : 1;
                  sendSettings(updated);
                }}
              >
                {label}
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
