import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import MyImageComponent from "./ImageContainer";

export default function ProjectPage({ showModal, content }) {
  // Close modal when clicking outside the modal box
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the modal box, close it
      if (!event.target.closest("#project-page-modal")) {
        showModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return (
    <Container maxWidth="md" id="project-page-modal">
      {/* Modal Background */}
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -1,
        }}
      ></div> */}
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "20px",
          padding: "20px 40px",
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
        {content === "blocking" ? (
          <div style={{ padding: "20px 100px" }}>
            <h5>Blocking Option 1</h5>
            <MyImageComponent
              path="./public/images/opt1-blocking.png"
              description="A block and stack for option 1"
            />
            <p>
              The Terrace is envisioned as a welcoming gateway on the west side
              of the existing Dental Science Complex. The concept centers on the
              ecology of learning and site, weaving together program and
              environment into a thoughtful composition of interconnected
              masses. This approach breaks down the building’s overall scale,
              creating a more human-centered experience that fosters comfort,
              connection, and engagement.
            </p>
          </div>
        ) : (
          <div style={{ padding: "20px 100px" }}>
            {" "}
            <h5>Design Option 1</h5>
            <MyImageComponent
              path="./public/images/opt1-massing.png"
              description="A block and stack for option 1"
            />
            <p>
              This approach breaks down the building’s overall scale, creating a
              more human-centered experience that fosters comfort, connection,
              and engagement.
            </p>
                        <MyImageComponent
              path="./public/images/op1-c02 EDITS.jpg"
              description="Exterior Rendering"
            />
            <MyImageComponent
              path="./public/images/op1-c01 EDITS.jpg"
              description="Exterior Rendering"
            />
                        <MyImageComponent
              path="./public/images/opt1-site.png"
              description="Exterior Rendering"
            />
          </div>
        )}
      </Box>
    </Container>
  );
}
