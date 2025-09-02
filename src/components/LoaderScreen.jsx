import * as React from "react";
import { Html} from "@react-three/drei";

export default function LoaderScreen({ onEnter, progress }) {

  return (
    <Html fullscreen>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
          <div
            style={{ fontSize: "4rem", color: "#00529B", fontWeight: "bold", textTransform: "uppercase" }}
          >
            <p id="loading-assets">Loading Assets...</p>
            <p id="loading-models">Loading 3D Models...</p>
            <p id="loading-textures">Loading Textures...</p>
          </div>
      </div>
    </Html>
  );
}
