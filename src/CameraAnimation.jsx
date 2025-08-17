import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Example: Map scrollY to camera position, rotation, and zoom
      gsap.to(camera.position, {
        x: 5 + scrollY * 0.01,
        y: 3 + scrollY * 0.005,
        z: 10 - scrollY * 0.02,
        duration: 1,
        overwrite: "auto",
      });
      gsap.to(camera.rotation, {
        x: 0,
        y: Math.PI / 4 + scrollY * 0.0005,
        z: 0,
        duration: 1,
        overwrite: "auto",
      });
      gsap.to(camera, {
        zoom: 1 + scrollY * 0.001,
        duration: 1,
        onUpdate: () => camera.updateProjectionMatrix(),
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);

  return null;
}