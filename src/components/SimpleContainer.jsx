import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Grid from "@mui/system/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import SelectLabels from "./SelectLabels";
import MyImageComponent from "./ImageContainer";
import ProjectModal from "./ProjectModal";

export default function SimpleContainer() {
  const [isShown, setIsShown] = useState(false);
  const [visibleSection, setVisibleSection] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setIsShown((current) => !current);
    setVisibleSection(null); // Hide all sections when toggling main panel
  };

  const sectionClick = (section) => {
    setVisibleSection((current) => (current === section ? null : section));
  };

  const showModal = () => {
    setOpenModal((current) => !current);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "20px",
              padding: "20px",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "white 1px solid",
              maxHeight: "80vh",
              overflow: "hidden", // Prevent content from overflowing parent
            }}
          >
            <Fab
              color="primary"
              aria-label="add"
              size="medium"
              onClick={handleClick}
            >
              {isShown ? <RemoveIcon /> : <AddIcon />}
            </Fab>
            {isShown && (
              <>
                <Stack
                  spacing={2}
                  direction="row"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Button
                    variant={
                      visibleSection === "program blocking"
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => sectionClick("program blocking")}
                  >
                    Program Blocking
                  </Button>
                  <Button
                    variant={
                      visibleSection === "design" ? "contained" : "outlined"
                    }
                    onClick={() => sectionClick("design")}
                  >
                    Design
                  </Button>
                  <Button
                    variant={
                      visibleSection === "help" ? "contained" : "outlined"
                    }
                    onClick={() => sectionClick("help")}
                  >
                    Help
                  </Button>
                </Stack>
                {visibleSection === "program blocking" && (
                  <div id="program blocking" style={{ width: "100%" }}>
                    <SelectLabels intent="Blocking Options" />
                    <Box
                      sx={{
                        height: "40vh", // Limit height of inner Box
                        overflowY: "auto", // Enable vertical scrolling
                        border: "1px solid grey",
                        p: 2,
                        bgcolor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "20px",
                        padding: "20px",
                        backdropFilter: "blur(10px)",
                        border: "white 1px solid",
                      }}
                    >
                      <MyImageComponent
                        path="./public/images/opt1-blocking.png"
                        description="A block and stack for option 1"
                      />
                      <p>
                        The Terrace is envisioned as a welcoming gateway on the
                        west side of the existing Dental Science Complex.
                      </p>
                      <p>
                        {" "}
                        The concept centers on the ecology of learning and site,
                        weaving together program and environment into a
                        thoughtful composition of interconnected masses.
                      </p>
                      <Button
                        variant="outlined"
                        onClick={() => showModal(true)}
                      >
                        Show {openModal ? "Less" : "More"}
                      </Button>
                    </Box>
                  </div>
                )}
                {visibleSection === "design" && (
                  <div id="design">
                    <SelectLabels intent="Design Options" />
                    <MyImageComponent
                      path="./public/images/opt1-massing.png"
                      description="A block and stack for option 1"
                    />
                    <p>
                      {" "}
                      This approach breaks down the building’s overall scale,
                      creating a more human-centered experience that fosters
                      comfort, connection, and engagement.
                    </p>
                  </div>
                )}
                {visibleSection === "help" && <div id="help"></div>}
              </>
            )}
          </Box>
        </Container>
        {openModal && (
          <Container maxWidth="lg">
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "20px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "white 1px solid",
                maxHeight: "80vh",
                overflow: "hidden", // Prevent content from overflowing parent
              }}
            >
              <>
                <div id="design">
                  <Fab size="medium">
                    <CloseIcon
                      fontSize="medium"
                      onClick={() => showModal(false)}
                    />
                  </Fab>
                  <MyImageComponent
                    path="./public/images/opt1-massing.png"
                    description="A block and stack for option 1"
                  />
                  <p>
                    {" "}
                    This approach breaks down the building’s overall scale,
                    creating a more human-centered experience that fosters
                    comfort, connection, and engagement.
                  </p>
                </div>
              </>
            </Box>
          </Container>
        )}
      </div>
      {/* {openModal && <ProjectModal onClose={showModal} openModal="true" />} */}
    </React.Fragment>
  );
}
