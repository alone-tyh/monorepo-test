import "./App.css";
import { TestB, TestComponent } from "@monorepo-test/ui";
import { ShadowBgSvg } from "./components/ShadowBgSvg";
import { ImageCapInset } from "./components/ImageCapInset";
import { CanvasCapInset } from "./components/CanvasCapInset";

function App() {
  return (
    <>
      <CanvasCapInset />
      <img src="http://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg" />
      {/* <ShadowBgSvg width={width} height={height} radius={radius} /> */}
      {/* <ImageCapInset /> */}
      {/* <TestComponent />
      <TestB /> */}
    </>
  );
}

export default App;
