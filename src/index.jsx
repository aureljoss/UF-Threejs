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
// import LoginButton from "./components/LoginButton.jsx";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
  const [visibleSection, setVisibleSection] = useState("Program Blocking");
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("1");

  // Auth0 Authentication
    // const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  //   React.useEffect(() => {
  //     if (!isLoading && !isAuthenticated) {
  //       loginWithRedirect();
  //     }
  //   }, [isLoading, isAuthenticated, loginWithRedirect]);

  //   if (isLoading || !isAuthenticated) {
  //     return null; // Or a loading component
  //   }

    const tabChange = (dataFromChild) => {
      setVisibleSection(dataFromChild);
    };

    const optionChange = (option) => {
      setOption(option);
    };

    console.log(visibleSection, option);

    return (
      <>
        {/* <LoginButton /> */}
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
  };


function AuthWrapper() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated]);

   if (isLoading || !isAuthenticated) {
    // Optionally show a loading spinner here
    return null;
  }

  return <App />;
}

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
