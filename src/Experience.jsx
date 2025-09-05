import {
  OrbitControls,
  useGLTF,
  useTexture,
  CameraShake,
  Center,
  Html,
} from "@react-three/drei";
import { useState, useEffect } from "react";
import { DoubleSide } from "three";
import HtmlText from "./components/HtmlText";
import LocationMarker from "./components/LocationMarker";
import CameraMarker from "./components/CameraMarker";
import CameraPage from "./components/CameraPage";
import MyImageComponent from "./components/ImageContainer";

//Important glb models
const programModels = [
  {
    tab: "Program Blocking",
    option: "Option 1",
    label: "Option 1 Blocking",
    glb: "./model/opt1-blocking.glb",
    texture: "./model/opt1-blocking.jpg",
    meshKey: "bakedOpt1Blocking",
    siteTexture: "./model/site-baked-op1-blocking.jpg",
  },
  {
    tab: "Program Blocking",
    option: "Option 2",
    label: "Option 2 Blocking",
    glb: "./model/opt2-blocking.glb",
    texture: "./model/opt2-blocking.jpg",
    meshKey: "bakedOpt2Blocking",
    siteTexture: "./model/site-baked-opt2-blocking.jpg",
  },
  {
    tab: "Program Blocking",
    option: "Option 3",
    label: "Option 3 Blocking",
    glb: "./model/opt2-blocking.glb",
    texture: "./model/opt2-blocking.jpg",
    meshKey: "bakedOpt2Blocking",
    siteTexture: "./model/site-baked-op1-blocking.jpg",
  },
];

const designModels = [
  {
    tab: "Design",
    option: "Option 1",
    label: "Option 1 Massing",
    glb: "./model/opt1-massing.glb",
    texture: "./model/opt1-Massing.jpg",
    meshKey: "bakedOpt1Massing",
    siteTexture: "./model/site-baked-opt1Massing.jpg",
  },
  // {
  //   tab: "Design",
  //   option: "Option 2",
  //   label: "Design - Option 2",
  //   glb: "./model/opt2-massing.glb",
  //   texture: "./model/opt2-massing.jpg",
  //   meshKey: "bakedOpt2Massing",
  // siteTexture: "./model/site-baked-op1-blocking.jpg",
  // },
];

export default function Experience(props) {
  const [selectedModel, setSelectedModel] = useState(programModels[0]);
  const [siteModel, setSiteModel] = useState(
    "./model/site-baked-op1-blocking.jpg"
  );
  const [activeOption, setActiveOption] = useState("Option 1");

  // useEffect(() => {
  //   // Reset to Option 1 when tab changes
  //   setActiveOption("Option 1");
  //   if (props.sendTabChange === "Design") {
  //     setSelectedModel(designModels[0]);
  //     setSiteModel("./model/site-baked-opt1Massing.jpg");
  //     setShowDesignCamera(true);
  //   } else if (props.sendTabChange === "Program Blocking") {
  //     setSelectedModel(programModels[0]);
  //     setSiteModel("./model/site-baked-op1-blocking.jpg");
  //   }
  // }, [props.sendTabChange]);

  useEffect(() => {
    let selected;
    if (props.sendTabChange === "Design") {
      selected = designModels.find(
        (m) => m.option === `Option ${props.sendOptionChange}`
      );
      if (!selected) selected = designModels[0]; // fallback
      setSelectedModel(selected);
      setSiteModel("./model/site-baked-opt1Massing.jpg");
      setShowDesignCamera(true);
    } else if (props.sendTabChange === "Program Blocking") {
      selected = programModels.find(
        (m) => m.option === `Option ${props.sendOptionChange}`
      );
      if (!selected) selected = programModels[0]; // fallback
      setSelectedModel(selected);
      setSiteModel("./model/site-baked-op1-blocking.jpg");
      setShowDesignCamera(false);
    }
  }, [props.sendTabChange, props.sendOptionChange]);

  const gltf = useGLTF(selectedModel.glb);
  const texture = useTexture(selectedModel.texture);
  texture.flipY = false;

  //Site
  const { nodes } = useGLTF("./model/site.glb");
  const siteTexture = useTexture(selectedModel.siteTexture);
  siteTexture.flipY = false;

  //Buildings
  const { nodes: buildingsNodes } = useGLTF("./model/buildings.glb");
  const buildingsTexture = useTexture("./model/buildings-baked.jpg");
  buildingsTexture.flipY = false;

  // //Trees
  const { nodes: treesNodes } = useGLTF("./model/trees.glb");
  const treesTexture = useTexture("./model/trees-baked.jpg");
  treesTexture.flipY = false;

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDesignCamera, setShowDesignCamera] = useState(false);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // People and Cars
  const { nodes: peopleCarsNodes } = useGLTF("./model/bakedPeopleCars.glb");
  const peopleCarsTexture = useTexture("./model/bakedPeopleCars.jpg");
  peopleCarsTexture.flipY = false;

  const showModal = () => {
    setShowDesignModal((current) => !current);
  };

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

          {/* People and Cars */}
          <mesh
            geometry={peopleCarsNodes.bakedPeopleCars.geometry}
            position={[0, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
          >
            <meshBasicMaterial map={peopleCarsTexture} />
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
            position={[7.4, 0.4, 0.2]}
            distanceFactor={4}
            onClick={() => setShowProjectModal(true)}
          />

          {/* Camera Marker OPTION 1*/}
          {showDesignCamera === true && props.sendTabChange === "Design" && (
            <CameraMarker
              position={[1.7, 0.2, 5.2]}
              distanceFactor={4}
              onClick={() => {
                setShowDesignModal(true);
                setOpenModal(true);
                setShowDesignModal(true);
              }}
            />
          )}

          {showDesignModal && (
            <CameraPage
              showModal={setShowDesignModal}
              content="design"
              option="option1"
              style={{ zIndex: 1000 }}
            />
          )}

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
              text="Shands Cancer Hospital"
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[8.4, 2.9, -1]}
              text="Shands Hospital "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[2, 2.35, 0]}
              text="College of Dentistry "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[-11, 0.9, 7]}
              text="Health Medical Plaza "
              distanceFactor={4}
              showArrow={true}
            />
            <HtmlText
              position={[-0.5, 1.2, -3.2]}
              text="Biomedical Sciences "
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

      {showProjectModal && (
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
              onClick={() => setShowProjectModal(false)}
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
