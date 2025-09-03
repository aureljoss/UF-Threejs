import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

// Example titles for each content/option
const cameraTitles = {
  design: {
    option1: "Design Camera View - Option 1",
    option2: "Design Camera View - Option 2",
    // Add more options as needed
  },
  "program blocking": {
    option1: "Program Blocking Camera View - Option 1",
    option2: "Program Blocking Camera View - Option 2",
    // Add more options as needed
  },
};

export default function CameraPage({ showModal, content, option }) {
  // Close modal when clicking outside the modal box
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#camera-page-modal")) {
        showModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // Get the title based on content and option
  const title =
    (cameraTitles[content] && cameraTitles[content][option]) ||
    "Camera View";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" id="camera-page-modal">
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "20px",
            padding: "40px",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "white 1px solid",
            maxHeight: "80vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <Fab
            size="small"
            style={{ position: "absolute", top: 16, right: 16 }}
            onClick={() => showModal(false)}
          >
            <CloseIcon fontSize="small" />
          </Fab>
          <h2>{title}</h2>
        </Box>
      </Container>
    </div>
  );
}