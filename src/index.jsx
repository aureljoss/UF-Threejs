import "./styles/styles.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";
import React, { Suspense, useState, useEffect } from "react";
import { Html } from "@react-three/drei"; // for loading progress
// import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SimpleContainer from "./components/SimpleContainer.jsx";
import LoaderScreen from "./components/LoaderScreen";
import LogoutButton from "./components/LogoutButton.jsx";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Fab from "@mui/material/Fab";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Intro from "./components/Intro.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
  const [visibleSection, setVisibleSection] = useState("Program Blocking");
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("1");
  const [cameraTargetPosition, setCameraTargetPosition] = useState(null);
  const [navTriggered, setNavTriggered] = useState(false);

  const tabChange = (dataFromChild) => {
    setVisibleSection(dataFromChild);
    const idx = findNavStep(dataFromChild, option);
    if (idx !== -1) setNavStep(idx);
  };

  const optionChange = (option) => {
    setOption(option);
    const idx = findNavStep(visibleSection, option);
    if (idx !== -1) setNavStep(idx);
  };

  const additionParam = 1; // Addition parameter for nav button
  const subtractionParam = -1; // Subtraction parameter for nav button

  // Define navigation steps
  const [navStep, setNavStep] = useState(0);

  const navigationSteps = [
    // 0: Camera marker 1 for program blocking option 1
    { section: "Program Blocking", option: "1", cameraMarker: 0 },
    // 1: Camera marker 2 for program blocking option 1
    { section: "Program Blocking", option: "1", cameraMarker: 1 },
    // 2 : Camera marker 3 for program blocking option 1
    { section: "Program Blocking", option: "1", cameraMarker: 2 },
    // 3: Camera marker 1 for program blocking option 2
    { section: "Program Blocking", option: "2", cameraMarker: 0 },
    // 4: Camera marker 2 for program blocking option 2
    { section: "Program Blocking", option: "2", cameraMarker: 1 },
    // 5: Camera marker 3 for program blocking option 2
    { section: "Program Blocking", option: "2", cameraMarker: 2 },
    // 6: Camera marker 1 for design option 1
    { section: "Design", option: "1", cameraMarker: 0 },
    // 7: Camera marker 2 for design option 1
    { section: "Design", option: "1", cameraMarker: 1 },
    // 8: Camera marker 3 for design option 1
    { section: "Design", option: "1", cameraMarker: 2 },
    // 9: Camera marker 1 for design option 2
    { section: "Design", option: "2", cameraMarker: 0 },
    // 10: Camera marker 2 for design option 2
    { section: "Design", option: "2", cameraMarker: 1 },
    // 11: Camera marker 3 for design option 2
    { section: "Design", option: "2", cameraMarker: 2 },
  ];

  const handleScrollButtonClick = () => {
    // Get all steps for the current section/option
    const filteredSteps = navigationSteps.filter(
      (step) => step.section === visibleSection && step.option === option
    );
    if (filteredSteps.length === 0) return;

    // Find the current step index within the filtered steps
    const currentFilteredIdx = filteredSteps.findIndex(
      (step) =>
        step.section === visibleSection &&
        step.option === option &&
        step.cameraMarker === navigationSteps[navStep]?.cameraMarker
    );

    // Calculate the next index, looping if needed
    const nextFilteredIdx = (currentFilteredIdx + 1) % filteredSteps.length;

    // Find the global index in navigationSteps
    const nextGlobalIdx = navigationSteps.findIndex(
      (step) =>
        step.section === filteredSteps[nextFilteredIdx].section &&
        step.option === filteredSteps[nextFilteredIdx].option &&
        step.cameraMarker === filteredSteps[nextFilteredIdx].cameraMarker
    );

    setNavStep(nextGlobalIdx);
    setNavTriggered(true);
  };

  useEffect(() => {
    if (!navTriggered) return; // Only run if triggered by navigation button

    const step = navigationSteps[navStep];
    if (typeof step.cameraMarker === "number") {
      const cameraMarkers = getCameraMarkers(step.section, step.option);
      setCameraTargetPosition(cameraMarkers[step.cameraMarker]);
    }
    // Reset navTriggered so it doesn't run again until button is clicked
    setNavTriggered(false);
  }, [navStep, navTriggered]);

  function getCameraMarkers(section, option) {
    // Return an array of camera marker positions for the given section/option
    // Example:
    if (section === "Program Blocking") {
      return [
        [-3.8, 1.8, -2],
        [-2.6, 3, 6.8],
        [6, 3, 4.3],
      ];
    }
    if (section === "Design" && option === "1") {
      return [
        [-3.8, 1.8, -2],
        [-2.6, 3, 6.8],
        [6, 3, 4.3],
      ];
    }
    if (section === "Design" && option === "2") {
      return [
        [-3.8, 1.8, -2],
        [-2.6, 3, 6.8],
        [6, 3, 4.3],
      ];
    }
    // ...repeat for other sections/options
    return [];
  }

  //Helper function to find the current step index
  function findNavStep(section, option) {
    return navigationSteps.findIndex(
      (step) =>
        step.section === section &&
        (typeof step.option === "undefined" || step.option === option)
    );
  }

  return (
    <>
      {/* <LoginButton /> */}
      <Intro />
      <div id="main-nav">
        <div style={{width:"100px"}}></div>
        <img src="images/ArchVue3D.png" alt="logo" id="logo" />
        <LogoutButton />
      </div>

      <div id="canvas-container">
        <Canvas
          flat
          camera={{
            fov: 50,
            near: 0.01,
            position: [-6, 8, 15],
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
              cameraTargetPosition={cameraTargetPosition}
              setCameraTargetPosition={setCameraTargetPosition}
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

      {/* Footer */}
      <footer>
        <nav id="footer">
          <div id="qrcode-container">
            <img src="images/qrcode_archvue3d.vercel.app.png" id="qrcode" />
            <p>QR Code</p>
          </div>
          <div className="scroll__wrapper">
            <Fab
              className="scroll-button"
              color="primary"
              aria-label="add"
              size="small"
              onClick={handleScrollButtonClick}
            >
              <ArrowDownwardIcon />
            </Fab>
            <Fab
              className="scroll-button"
              color="primary"
              aria-label="add"
              size="small"
              onClick={handleScrollButtonClick}
            >
              <ArrowUpwardIcon />
            </Fab>
          </div>
        </nav>
      </footer>
    </>
  );
}

// Authentication Wrapper

function AuthWrapper() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  //  if (isLoading || !isAuthenticated) {
  //   // Optionally show a loading spinner here
  //   return null;
  // }

  return <App />;
}

// Render

root.render(
  <Auth0Provider
    domain="dev-ytfzxy03jl6z81rl.us.auth0.com"
    clientId="Bk2ejfuM7KtdvgHbcVAwvEPQ26sn5W8X"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <AuthWrapper />
  </Auth0Provider>
);
