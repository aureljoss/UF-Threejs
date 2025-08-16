import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Html,
} from "@react-three/drei";
import { DoubleSide } from "three";
import { useState } from "react";
import { useControls } from "leva";

export default function Experience() {
  const { nodes } = useGLTF("./static/model/Site.glb");
  const bakedTexture = useTexture("./static/model/site-baked.jpg");
  bakedTexture.flipY = false;

  const [showModal, setShowModal] = useState(false);

  const { buildingVariant } = useControls({
    buildingVariant: { value: 1, min: 1, max: 3, step: 1, label: "Options" },
  });

  // SVG for Google Maps-style location marker
  const LocationMarker = () => (
    <svg width="120" height="120" viewBox="0 0 40 40">
      <circle cx="20" cy="15" r="7" fill="#e74c3c" />
      <path
        d="M20 5 C27 5, 35 13, 20 35 C5 13, 13 5, 20 5 Z"
        fill="#e74c3c"
        stroke="#c0392b"
        strokeWidth="2"
      />
      <circle cx="20" cy="15" r="3" fill="#fff" />
    </svg>
  );

  return (
    <>
      <color args={["#ffffff"]} attach="background" />
      <OrbitControls
        makeDefault
        autoRotateSpeed={-0.1}
        zoomSpeed={2}
        enableZoom={true}
        minDistance={6}
        maxDistance={3000000}
        // enablePan={false}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        // minAzimuthAngle={(Math.PI*2)/1.15}
        // maxAzimuthAngle={Math.PI*2}
      />

      <Center>
        {/* <mesh geometry={nodes.baked.geometry} position={[-1.6, 2.65, 1.5]}> */}
        <mesh geometry={nodes.baked.geometry} position={[0,0,0]} scale={[0.01,0.01,0.01]}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        {/* Hotspot */}
        <Html
          className="hotspot"
          position={[8.5,2.3,-1]} // Change position as needed
          center
          distanceFactor={4}
        >
          <div className="markers" onClick={() => setShowModal(true)}>
            <LocationMarker />
          </div>
        </Html>
      </Center>

      {/* Modal */}
      {showModal && (
        <Html fullscreen>
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translate(0%, -90%)",
              background: "rgba(255, 255, 255, 0.3",
              backgroundFilter: "blur(10px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.8)",
              padding: "2rem",
              borderRadius: "2rem",
              boxShadow:
                "0 8px 32px rgba(31, 38, 135, 0.2),inset 0 4px 20px rgba(255, 255, 255, 0.3)",
              zIndex: 1000,
              minWidth: "400px",
              color: "rgba(0, 0, 0, 0.9)",
            }}
          >
            {/* Close Cross */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "black",
                zIndex: 1001,
              }}
              aria-label="Close"
            >
              &#10005;
            </button>
            <h2>UF Health Shands Hospital</h2>
            <p>
              UF Health represents the commitment of more than 30,000 faculty
              and staff to reach higher and farther. Together we translate
              scientific discoveries into patient care advances that help people
              get back to living their best possible life.
            </p>
          </div>
        </Html>
      )}
    </>
  );
}
