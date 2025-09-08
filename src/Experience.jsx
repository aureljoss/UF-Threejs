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
import MyImageComponent from "./components/ImageContainer";
import { useThree, useFrame } from "@react-three/fiber";

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
  // {
  //   tab: "Program Blocking",
  //   option: "Option 3",
  //   label: "Option 3 Blocking",
  //   glb: "./model/opt2-blocking.glb",
  //   texture: "./model/opt2-blocking.jpg",
  //   meshKey: "bakedOpt2Blocking",
  //   siteTexture: "./model/site-baked-op1-blocking.jpg",
  // },
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
  {
    tab: "Design",
    option: "Option 2",
    label: "Option 2 Massing",
    glb: "./model/opt2-massing.glb",
    texture: "./model/opt2-Massing.jpg",
    meshKey: "bakedOpt2Massing",
    siteTexture: "./model/site-baked-opt2-massing.jpg",
  },
];

export default function Experience(props) {
  const [cameraTargetPosition, setCameraTargetPosition] = useState(null);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState(programModels[0]);
  const [siteModel, setSiteModel] = useState(
    "./model/site-baked-op1-blocking.jpg"
  );
  useEffect(() => {
    let selected;
    if (props.visibleSection === "Design") {
      selected = designModels.find(
        (m) => m.option === `Option ${props.option}`
      );
      if (!selected) selected = designModels[0]; // fallback
      setSelectedModel(selected);
      setSiteModel("./model/site-baked-opt1Massing.jpg");
      setShowDesignCamera(true);
    } else if (props.visibleSection === "Program Blocking") {
      selected = programModels.find(
        (m) => m.option === `Option ${props.option}`
      );
      if (!selected) selected = programModels[0]; // fallback
      setSelectedModel(selected);
      setSiteModel("./model/site-baked-op1-blocking.jpg");
      setShowDesignCamera(false);
    }
  }, [props.visibleSection, props.option]);

  // Updates Camera position when LocationMarker is clicked
  const { camera } = useThree();

  useFrame(() => {
    if (cameraTargetPosition) {
      // Target position for camera (customize offset as needed)
      const target = {
        x: cameraTargetPosition[0],
        y: cameraTargetPosition[1],
        z: cameraTargetPosition[2],
      };

      // Smoothly interpolate camera position
      camera.position.lerp(target, 0.08);
      // setOrbitEnabled(false); // Disable OrbitControls during animation

      // Look at the origin
      // camera.lookAt(0,0,0);

      // If camera is close enough to target, stop animating
      const dist = camera.position.distanceTo(target);
      if (dist < 0.001) {
        // Snap to target and stop animating
        camera.position.set(target.x, target.y, target.z);
        // camera.lookAt(...cameraTargetPosition);
        setCameraTargetPosition(null); //
        // setOrbitEnabled(true); // Re-enable OrbitControls after animation
      }
    }
  });

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
        enabled={orbitEnabled}
        autoRotateSpeed={-0.1}
        zoomSpeed={2}
        enableZoom={true}
        minDistance={2}
        maxDistance={3000000}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.1}
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
            <meshBasicMaterial map={peopleCarsTexture} side={DoubleSide} />
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
            position={[5.8, 0.4, 4.3]}
            distanceFactor={4}
            onClick={() => setCameraTargetPosition([6, 3, 4.3])}
          />

          <LocationMarker
            position={[-2.6, 0.4, 6.8]}
            distanceFactor={4}
            onClick={() => setCameraTargetPosition([-2.6, 3, 6.8])}
          />

          <LocationMarker
            position={[-2.6, 0.4, -0.6]}
            distanceFactor={4}
            onClick={() => setCameraTargetPosition([-3.8, 1.8, -2])}
          />

          {/* Camera Marker OPTION 1*/}
          {showDesignCamera === true &&
            props.visibleSection === "Design" &&
            props.option === "1" && (
              <CameraMarker
                position={[1.7, 0.2, 5.2]}
                distanceFactor={4}
                onClick={() => {
                  props.setOpenModal(true);
                  props.setVisibleSection("camera");
                  props.setOption("1");
                }}
              />
            )}

          {showDesignCamera === true &&
            props.visibleSection === "camera" &&
            props.option === "1" && (
              <CameraMarker
                position={[1.7, 0.2, 5.2]}
                distanceFactor={4}
                onClick={() => {
                  props.setOpenModal(true);
                  props.setVisibleSection("camera");
                  props.setOption("1");
                }}
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
    </>
  );
}
