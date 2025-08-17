import {
  OrbitControls,
  useGLTF,
  useScroll,
  useTexture,
  CameraShake,
  Center,
  Html,
  ScrollControls,
} from "@react-three/drei";
import { useState, useRef } from "react";
import { useControls } from "leva";
import { DoubleSide } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { Perf } from 'r3f-perf'

const models = [
  {
    label: "Option 1 Blocking",
    glb: "./static/model/opt1-blocking.glb",
    texture: "./static/model/opt1-blocking.jpg",
    meshKey: "bakedOpt1B",
  },
  {
    label: "Option 1 Massing",
    glb: "./static/model/opt1-massing.glb",
    texture: "./static/model/opt1-massing.jpg",
    meshKey: "bakedOpt1Massing",
  },
];

// function CameraScrollAnimation() {
//   const { camera } = useThree();
//   const scroll = useScroll();

//   useFrame(() => {
//     // Get normalized scroll value (0 to 1)
//     const scrollValue = scroll.offset;

//       // gsap.to(camera.position, {
//       //   x: 5 + scrollValue * 0.01,
//       //   y: 3 + scrollValue * 0.005,
//       //   z: 10 - scrollValue * 0.02,
//       //   duration: 1,
//       //   overwrite: "auto",
//       // });
//       // gsap.to(camera.rotation, {
//       //   x: 0,
//       //   y: Math.PI / 4 + scrollValue * 0.0005,
//       //   z: 0,
//       //   duration: 1,
//       //   overwrite: "auto",
//       // });

//     // Animate camera position, rotation, and zoom based on scroll
//     camera.position.x = -10 + scrollValue * 20; // from -10 to 10
//     camera.position.y = 10 - scrollValue * 5; // from 10 to 5
//     camera.position.z = 16 - scrollValue * 10; // from 16 to 6
//     camera.rotation.y = scrollValue * Math.PI * 0.5; // rotate up to 90deg
//     camera.zoom = 1 + scrollValue * 1.5; // zoom from 1 to 2.5

//     camera.lookAt(0, 0, 0)

//     camera.updateProjectionMatrix();
//   });

//   return null;
// }

export default function Experience() {
  const { Option } = useControls({
    Option: {
      value: models[0].label,
      options: models.map((m) => m.label),
    },
  });

  const selectedModel = models.find((m) => m.label === Option);

  const gltf = useGLTF(selectedModel.glb);
  const texture = useTexture(selectedModel.texture);
  texture.flipY = false;

  const { nodes } = useGLTF("./static/model/site.glb");
  const siteTexture = useTexture("./static/model/site-baked.jpg");
  siteTexture.flipY = false;

  const [showModal, setShowModal] = useState(false);

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
      <color args={["#d3e5f8"]} attach="background" />
      <OrbitControls
        makeDefault
        autoRotateSpeed={-0.1}
        zoomSpeed={2}
        enableZoom={true}
        minDistance={12}
        maxDistance={3000000}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
      <CameraShake
        maxYaw={0.001}
        maxPitch={0.001}
        maxRoll={0.01}
        yawFrequency={0.8}
        pitchFrequency={0.8}
        rollFrequency={0.8}
        intensity={1.0}
        decayRate={0.8}
      />

      {/*Performance Monitoring */}
      <Perf position="bottom-left" />

      {/* <ScrollControls pages={4} damping={0.25}> */}
        {/* <CameraScrollAnimation /> */}
        <Center>
          <group>

            <mesh
              geometry={nodes.baked.geometry}
              position={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            >
              <meshBasicMaterial map={siteTexture} side={DoubleSide} />
            </mesh>
            <mesh
              geometry={gltf.nodes[selectedModel.meshKey].geometry}
              position={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            >
              <meshBasicMaterial map={texture} />
            </mesh>
            <Html
              className="hotspot"
              position={[8.5, 2.3, -1]}
              center
              distanceFactor={4}
            >
              <div className="markers" onClick={() => setShowModal(true)}>
                <LocationMarker />
              </div>
            </Html>
          </group>
        </Center>
      {/* </ScrollControls> */}

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
            <h3>UF Health Shands Hospital</h3>
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
