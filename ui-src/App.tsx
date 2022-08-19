import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import "./App.css";

function App() {
  const [ts, setTs] = useState<string>("");
  const [jsx, setJsx] = useState<string>("");
  const [tab, setTab] = useState<"ts" | "jsx">("jsx");
  const [defaults, setDefaults] = useState(true);
  const [booleans, setBooleans] = useState(false);

  useEffect(() => {
    window.onmessage = ({
      data: {
        pluginMessage: { ts, jsx, showDefaultValues, explicitBooleans },
      },
    }) => {
      setDefaults(showDefaultValues);
      setBooleans(explicitBooleans);
      setTs(
        prettier.format(ts, {
          printWidth: 40,
          parser: "babel-ts",
          plugins: [parserBabel],
          semi: true,
        })
      );
      setJsx(
        prettier
          .format(`<>${jsx}</>`, {
            printWidth: 40,
            parser: "babel-ts",
            plugins: [parserBabel],
            semi: true,
          })
          .replace("</>;", "</>")
      );
    };
    function ping() {
      parent.postMessage({ pluginMessage: { type: "PING" } }, "*");
    }
    setInterval(ping, 500);
  }, []);

  function sendSettings({
    defaults,
    booleans,
  }: {
    defaults: boolean;
    booleans: boolean;
  }) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "SETTINGS",
          explicitBooleans: booleans,
          showDefaultValues: defaults,
        },
      },
      "*"
    );
  }

  return (
    <>
      <header>
        <div>
          <button
            className={tab === "ts" ? "" : "brand"}
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
        </div>
        {tab === "jsx" ? (
          <div>
            <button
              className={defaults ? "brand" : ""}
              onClick={() => sendSettings({ defaults: !defaults, booleans })}
            >
              Defaults
            </button>
            &nbsp;
            <button
              className={booleans ? "brand" : ""}
              onClick={() => sendSettings({ defaults, booleans: !booleans })}
            >
              Booleans
            </button>
          </div>
        ) : null}
      </header>
      <main>
        {tab === "ts" ? (
          <SyntaxHighlighter
            customStyle={{ margin: 0 }}
            language="typescript"
            style={theme}
          >
            {ts}
          </SyntaxHighlighter>
        ) : (
          <SyntaxHighlighter
            customStyle={{ margin: 0 }}
            language="jsx"
            style={theme}
          >
            {jsx}
          </SyntaxHighlighter>
        )}
      </main>
    </>
  );
}

export default App;
