import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FormatLanguage, FormatResult, FormatSettings } from "../shared";
import {
  tomorrow as themeDark,
  materialLight as themeLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import "./App.css";

const prettierOptions = {
  printWidth: 40,
  parser: "babel-ts",
  plugins: [parserBabel],
  semi: true,
};

const joiner = (items: string[]) => items.join("\n\n");

const detectLightMode = () =>
  document.documentElement.classList.contains("figma-light");

function App() {
  const [resultsMap, setResultsMap] = useState<{
    [K in FormatLanguage]?: FormatResult;
  }>({});
  const [tab, setTab] = useState<FormatLanguage>();
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
          map[result.language] = {
            language: result.language,
            label: result.label,
            settings: [...result.settings],
            lines: [...result.lines],
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
        setTab(value.language);
      }
    }
  }, [resultsMap, tab, setTab]);

  const result = tab ? resultsMap[tab] : null;

  function sendSettings(settings: FormatSettings) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SETTINGS",
          language: result?.language,
          settings,
        },
      },
      "*"
    );
  }

  function renderedResult() {
    if (!result) return null;

    const renderCode = (text: string) => (
      <SyntaxHighlighter
        customStyle={{ margin: 0 }}
        language={result.language}
        style={theme}
      >
        {text}
      </SyntaxHighlighter>
    );

    switch (result.language) {
      case "json":
        return renderCode(result.lines.join("\n"));
      case "jsx":
        const jsxString =
          result.lines.length > 1
            ? `<>${joiner(result.lines)}</>`
            : joiner(result.lines);
        return renderCode(
          prettier.format(jsxString, prettierOptions).replace(/;\n$/, "")
        );
      case "ts":
        const tsString = joiner(result.lines);
        return renderCode(prettier.format(tsString, prettierOptions));
    }
  }

  return (
    <>
      <header>
        <div>
          {Object.values(resultsMap).map(({ label, language }) => (
            <button
              key={language}
              className={tab === language ? "brand" : ""}
              onClick={() => setTab(language)}
            >
              {label}
            </button>
          ))}
        </div>
        {result ? (
          <div>
            {result.settings.map(([label, value], i) => (
              <button
                className={value ? "brand small" : "small"}
                onClick={() => {
                  const updated = [...result.settings];
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
