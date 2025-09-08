import "./styles/styles.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";
import React, { Suspense, useState } from "react";
import { Html } from "@react-three/drei"; // for loading progress
// import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SimpleContainer from "./components/SimpleContainer.jsx";
import LoaderScreen from "./components/LoaderScreen";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
  const [visibleSection, setVisibleSection] = useState("Program Blocking");
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("1");

  // const showModal = (content, option) => {
  //   setVisibleSection(content);
  //   setOption(option);
  //   setOpenModal(true);
  // };

  const tabChange = (dataFromChild) => {
    setVisibleSection(dataFromChild);
  };

  const optionChange = (option) => {
    setOption(option);
  };

  return (
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
          <Suspense fallback={<LoaderScreen />}>
            <Experience
              visibleSection={visibleSection}
              option={option}
              // showModal={showModal}
              setOpenModal={setOpenModal}
              setVisibleSection={setVisibleSection}
              setOption={setOption}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="simple-container">
        <SimpleContainer 
          tabChange={tabChange}
          optionChange={optionChange}
          openModal={openModal}
          setOpenModal={setOpenModal}
          option={option}
          setOption={setOption}
          // showModal={showModal}
          setVisibleSection={setVisibleSection}
          visibleSection={visibleSection}
        />
      </div>
    </>
  );
}

root.render(<App />);
