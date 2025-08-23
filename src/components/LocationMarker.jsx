import { Html } from "@react-three/drei";

export default function LocationMarker({
  position,
  distanceFactor,
  onClick,
  ...props
}) {
  return (
    <Html position={position} distanceFactor={distanceFactor} center {...props}>
      <div className="markers" style={{ cursor: "pointer" }} onClick={onClick}>
        <svg width="200" height="200" viewBox="0 0 40 40">
          <circle cx="20" cy="15" r="7" fill="#e74c3c" />
          <path
            d="M20 5 C27 5, 35 13, 20 35 C5 13, 13 5, 20 5 Z"
            fill="#e74c3c"
            stroke="#c0392b"
            strokeWidth="2"
          />
          <circle cx="20" cy="15" r="3" fill="#fff" />
        </svg>
      </div>
    </Html>
  );
}
