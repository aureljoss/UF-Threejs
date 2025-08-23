import { Html } from "@react-three/drei";

export default function HtmlText({
  position = [0, 0, 0],
  text = "",
  distanceFactor = 1,
  showArrow = true,
  ...props
}) {
  return (
    <Html position={position} distanceFactor={distanceFactor} center {...props} >
      <div
        className="html-text"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          color: "#222",
          fontWeight: "bold",
          pointerEvents: "auto",
          fontSize: "40px",
          textTransform: "uppercase",
          width: "400px",
          textAlign: "center",
        }}
      >
        {text}
        <div
          className="html-text__arrow"
          style={{ display: showArrow ? "block" : "none" }} // <-- control visibility
        />
      </div>
    </Html>
  );
}
