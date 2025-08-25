import "./styles/styles.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";
import React, { Suspense } from "react";
import { Html } from "@react-three/drei"; // for loading progress
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SimpleContainer from "./components/SimpleContainer.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function Loader() {
  return (
    <Html center>
      <div id="loader-threejs">Something fun is loading...</div>
    </Html>
  );
}

root.render(
  <>
    <div id="canvas-container">
      <Canvas
        flat
        camera={{
          fov: 35,
          near: 0.01,
          position: [-10, 10, 30],
        }}
      >
        <EffectComposer>
          <DepthOfField
            focusDistance={0.015}
            focalLength={0.05}
            bokehScale={2}
            height={480}
          />
        </EffectComposer>
        <Suspense fallback={<Loader />}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
    <div className="simple-container">
      <SimpleContainer />
    </div>
  </>
);
