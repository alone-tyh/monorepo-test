import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TestB, TestComponent } from "@monorepo-test/ui";

function App() {
  const [count, setCount] = useState(0);

  const width = 500,
    height = 600,
    radius = 60;
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ width, height, border: "1px solid black" }}>
        <svg
          width={width}
          height={height}
          style={{ width, height, borderRadius: 20 }}
        >
          <defs>
            <linearGradient id="line-top" x1={0} y1={0} x2={0} y2={1}>
              <stop offset={"0%"} stopColor="rgb(255, 0, 0)" stopOpacity={1} />
              <stop
                offset={"100%"}
                stopColor="rgb(255, 255, 255)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="line-left" x1={0} y1={0} x2={1} y2={0}>
              <stop offset={"0%"} stopColor="rgb(255, 0, 0)" stopOpacity={1} />
              <stop
                offset={"100%"}
                stopColor="rgb(255, 255, 255)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="line-right" x1={1} y1={0} x2={0} y2={0}>
              <stop offset={"0%"} stopColor="rgb(255, 0, 0)" stopOpacity={1} />
              <stop
                offset={"100%"}
                stopColor="rgb(255, 255, 255)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="line-bottom" x1={0} y1={1} x2={0} y2={0}>
              <stop offset={"0%"} stopColor="rgb(255, 0, 0)" stopOpacity={1} />
              <stop
                offset={"100%"}
                stopColor="rgb(255, 255, 255)"
                stopOpacity={0}
              />
            </linearGradient>
            <radialGradient
              id="radial-left-top"
              cx={"50%"}
              cy={"50%"}
              r={"100%"}
              fx="0%"
              fy="0%"
            >
              <stop offset={"0%"} stopColor="rgb(255, 0, 0)" stopOpacity={1} />
              <stop
                offset={"100%"}
                stopColor="rgb(255, 255, 255)"
                stopOpacity={0}
              />
            </radialGradient>
          </defs>
          {/* <rect
            x="0"
            y="0"
            width={"40"}
            height={"40"}
            fill={"url(#radial-left-top)"}
          /> */}
          <rect
            x="0"
            y="100% - 60"
            width={"100%"}
            height={radius}
            fill={"url(#line-top)"}
          />
          <rect x="0" y="0" width={radius} height={"100%"} fill="url(#line-left)" />
          <rect
            x={width - radius}
            y="0"
            width={radius}
            height={"100%"}
            fill="url(#line-right)"
          />
          <rect
            x="0"
            y={height - radius}
            width="100%"
            height={radius}
            fill="url(#line-bottom)"
          />
        </svg>
      </div>
      <TestComponent />
      <TestB />
    </>
  );
}

export default App;
