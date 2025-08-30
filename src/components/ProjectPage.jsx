import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import MyImageComponent from "./ImageContainer";

export default function ProjectPage({ showModal }) {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          border: "white 1px solid",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative", // for children positioning
        }}
      >
        <Fab
          size="small"
          color="default"
          style={{ position: "sticky", top: 20, right:20, alignSelf: "flex-end" }}
          onClick={() => showModal(false)}
        >
          <CloseIcon fontSize="small" />
        </Fab>
        <div style={{ padding: "20px 100px"}}>
        <h5>Blocking Option 1</h5>
        <MyImageComponent
          path="./public/images/opt1-blocking.png"
          description="A block and stack for option 1"
        />
        <p>
          <p>
            The Terrace is envisioned as a welcoming gateway on the west side of
            the existing Dental Science Complex.
          </p>
          <p>
            The concept centers on the ecology of learning and site, weaving
            together program and environment into a thoughtful composition of
            interconnected masses.
          </p>
          This approach breaks down the building’s overall scale, creating a
          more human-centered experience that fosters comfort, connection, and
          engagement.
        </p>
        </div>
      </Box>
    </Container>
  );
}
