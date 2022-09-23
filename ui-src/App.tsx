import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
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

const joiner = (items: string[][]) =>
  items.map((i) => i.join("\n\n")).join("\n\n");

const detectLightMode = () =>
  document.documentElement.classList.contains("figma-light");

function App() {
  const [ts, setTs] = useState<string>("");
  const [jsx, setJsx] = useState<string>("");
  const [json, setJson] = useState<string>("");
  const [tab, setTab] = useState<"ts" | "jsx" | "json">("jsx");
  const [defaults, setDefaults] = useState(true);
  const [booleans, setBooleans] = useState(false);
  const [text, setText] = useState(false);
  const [theme, setTheme] = useState<{ [key: string]: React.CSSProperties }>(
    detectLightMode() ? themeLight : themeDark
  );

  useEffect(() => {
    window.onmessage = ({
      data: {
        pluginMessage: {
          type,
          json,
          interfaces,
          instances,
          types,
          showDefaultValues,
          explicitBooleans,
          findText,
        },
      },
    }) => {
      setDefaults(showDefaultValues);
      setBooleans(explicitBooleans);
      setText(findText);
      if (type === "RESULT") {
        const tsString = joiner([types, interfaces]);
        setTs(prettier.format(tsString, prettierOptions));
        const jsxString =
          instances.length > 1
            ? `<>${joiner([instances])}</>`
            : joiner([instances]);
        setJsx(prettier.format(jsxString, prettierOptions).replace(/;\n$/, ""));
        setJson(json);
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

  function sendSettings({
    defaults,
    text,
    booleans,
  }: {
    defaults: boolean;
    text: boolean;
    booleans: boolean;
  }) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SETTINGS",
          explicitBooleans: booleans,
          findText: text,
          showDefaultValues: defaults,
        },
      },
      "*"
    );
  }

  const renderCode = (language: string, text: string) => (
    <SyntaxHighlighter
      customStyle={{ margin: 0 }}
      language={language}
      style={theme}
    >
      {text}
    </SyntaxHighlighter>
  );

  return (
    <>
      <header>
        <div>
          <button
            className={tab === "jsx" ? "brand" : ""}
            onClick={() => setTab("jsx")}
          >
            Components
          </button>
          &nbsp;
          <button
            className={tab === "ts" ? "brand" : ""}
            onClick={() => setTab("ts")}
          >
            Types
          </button>
          &nbsp;
          <button
            className={tab === "json" ? "brand" : ""}
            onClick={() => setTab("json")}
          >
            JSON
          </button>
        </div>
        {tab === "jsx" ? (
          <div>
            <button
              className={defaults ? "brand" : ""}
              onClick={() =>
                sendSettings({ defaults: !defaults, text, booleans })
              }
            >
              Defaults
            </button>
            &nbsp;
            <button
              className={booleans ? "brand" : ""}
              onClick={() =>
                sendSettings({ defaults, text, booleans: !booleans })
              }
            >
              Booleans
            </button>
            &nbsp;
            <button
              className={text ? "brand" : ""}
              onClick={() => sendSettings({ defaults, text: !text, booleans })}
            >
              Text
            </button>
          </div>
        ) : null}
      </header>
      <main>
        {tab === "ts" ? renderCode("typescript", ts) : null}
        {tab === "jsx" ? renderCode("jsx", jsx) : null}
        {tab === "json" ? renderCode("json", json) : null}
      </main>
    </>
  );
}

export default App;
