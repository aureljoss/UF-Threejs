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
import { useState, useRef, useEffect } from "react";
import { useControls } from "leva";
import { DoubleSide } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { Perf } from "r3f-perf";
import HtmlText from "./components/HtmlText";
import LocationMarker from "./components/LocationMarker";

//Important glb models
const programModels = [
  {
    tab: "Program Blocking",
    option: "Option 1",
    label: "Option 1 Blocking",
    glb: "./model/opt1-blocking.glb",
    texture: "./model/opt1-blocking.jpg",
    meshKey: "bakedOpt1Blocking",
  },
];

const designModels = [
  {
    tab: "Design",
    option: "Option 1",
    label: "Option 1 Massing",
    glb: "./model/opt1-massing.glb",
    texture: "./model/opt1-massing.jpg",
    meshKey: "bakedOpt1Massing",
  },
  // {
  //   tab: "Design",
  //   option: "Option 2",
  //   label: "Design - Option 2",
  //   glb: "./model/opt2-massing.glb",
  //   texture: "./model/opt2-massing.jpg",
  //   meshKey: "bakedOpt2Massing",
  // },
];

export default function Experience(props) {
  const [selectedModel, setSelectedModel] = useState(programModels[0]);

  useEffect(() => {
    if (props.sendTabChange === "Design") {
      setSelectedModel(designModels[0]);
    } else if (props.sendTabChange === "Program Blocking") {
      setSelectedModel(programModels[0]);
    }
  }, [props.sendTabChange]);

  const gltf = useGLTF(selectedModel.glb);
  const texture = useTexture(selectedModel.texture);
  texture.flipY = false;

  //Site
  const { nodes } = useGLTF("./model/site.glb");
  const siteTexture = useTexture("./model/site-baked-op1-blocking.jpg");
  siteTexture.flipY = false;

  //Buildings
  const { nodes: buildingsNodes } = useGLTF("./model/buildings.glb");
  const buildingsTexture = useTexture("./model/buildings-baked.jpg");
  buildingsTexture.flipY = false;

  // //Trees
  const { nodes: treesNodes } = useGLTF("./model/trees.glb");
  const treesTexture = useTexture("./model/trees-baked.jpg");
  treesTexture.flipY = false;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <color args={["#d3e5f8"]} attach="background" />
      <OrbitControls
        makeDefault
        autoRotateSpeed={-0.1}
        zoomSpeed={2}
        enableZoom={true}
        minDistance={2}
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
      {/* <Perf position="bottom-left" /> */}

      {/* <ScrollControls pages={4} damping={0.25}> */}
      {/* <CameraScrollAnimation /> */}
      <Center>
        <group>
          {/* Site */}
          <mesh
            geometry={nodes.siteBaked.geometry}
            position={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
          >
            <meshBasicMaterial map={siteTexture} side={DoubleSide} />
          </mesh>

          {/* Buildings */}
          <mesh
            geometry={buildingsNodes.buildingsBaked.geometry}
            position={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
          >
            <meshBasicMaterial map={buildingsTexture} />
          </mesh>

          {/* Trees */}
          <mesh
            geometry={treesNodes.treesBaked.geometry}
            position={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
          >
            <meshBasicMaterial map={treesTexture} />
          </mesh>

          {/* Selected Model */}
          <mesh
            geometry={gltf.nodes[selectedModel.meshKey].geometry}
            position={[0, 0.004, 0]}
            scale={[0.01, 0.01, 0.01]}
          >
            <meshBasicMaterial map={texture} />
          </mesh>

          {/* Location Marker */}
          <LocationMarker
            position={[-1.6, 0.4, 3.8]}
            distanceFactor={4}
            onClick={() => setShowModal(true)}
          />

          {/* HTML Markers */}
          <>
            <HtmlText
              position={[-4, 1, 3]}
              text="Shands Parking"
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[2.7, 1.6, 7.2]}
              text="VA Hospital"
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[9.8, 2.6, 2.5]}
              text="UF Health Shands Cancer Hospital"
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[8.4, 2.9, -1]}
              text="UF Health Shands Hospital "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[2, 2.35, 0]}
              text="UF College of Dentistry "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[-11, 0.9, 7]}
              text="UF Health Medical Plaza "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[-0.5, 1.2, -3.2]}
              text="UF Biomedical Sciences "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[2, 1.4, -4]}
              text="Stetson Medical Sciences "
              distanceFactor={4}
              showArrow={true}
            />
          </>
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
