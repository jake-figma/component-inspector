import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow as themeDark,
  materialLight as themeLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import "./App.css";

const detectLightMode = () =>
  document.documentElement.classList.contains("figma-light");

function App() {
  const [ts, setTs] = useState<string>("");
  const [jsx, setJsx] = useState<string>("");
  const [tab, setTab] = useState<"ts" | "jsx">("jsx");
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
      const tsString = [types.join("\n\n"), interfaces.join("\n\n")].join(
        "\n\n"
      );
      setTs(
        prettier.format(tsString, {
          printWidth: 40,
          parser: "babel-ts",
          plugins: [parserBabel],
          semi: true,
        })
      );
      const jsxString = instances.join("\n\n");
      setJsx(
        prettier
          .format(instances.length > 1 ? `<>${jsxString}</>` : jsxString, {
            printWidth: 40,
            parser: "babel-ts",
            plugins: [parserBabel],
            semi: true,
          })
          .replace(/;\n$/, "")
      );
    };

    const ping = () =>
      parent.postMessage({ pluginMessage: { type: "PING" } }, "*");
    setInterval(ping, 500);

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
