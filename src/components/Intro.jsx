import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

export default function Intro() {
  const [showIntroBox, setShowIntroBox] = React.useState(true);

  // Closes box when clicking outside of it
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if the intro box is open and the click is outside
      if (showIntroBox && !event.target.closest("#intro-container")) {
        setShowIntroBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showIntroBox]);

  if (!showIntroBox) return null;

  return (
    <div id="intro-container">
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "20px",
          padding: "10px 60px 20px",
          backdropFilter: "blur(10px)",
          flexDirection: "column",
          alignItems: "center",
          border: "white 1px solid",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -65%)",
          maxWidth: "500px",
        }}
      >
        <Fab
          size="small"
          style={{ position: "absolute", top: 16, right: 16 }}
          onClick={() => setShowIntroBox(false)}
        >
          <CloseIcon fontSize="small" />
        </Fab>
        <h6
          style={{
            lineHeight: "0",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          What is ArchVue3D?
        </h6>
        <p style={{ fontWeight: "600", fontSize: "14px" }}>
          ArchVue3D is an interactive platform that transforms architectural
          designs into immersive, real-time experiences.
        </p>
        <p style={{ fontWeight: "300", fontSize: "14px" }}>
          Whether for clients, stakeholders, or design teams, ArchVue3D bridges
          the gap between concept and reality, making architectural visions
          engaging and accessible.
        </p>
      </Box>
    </div>
  );
}
