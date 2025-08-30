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
import ProjectPage from "./ProjectPage";

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
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Container maxWidth="xs">
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
            }}
          >
            <Fab
              color="primary"
              aria-label="add"
              size="small"
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
                    size="small"
                    onClick={() => sectionClick("program blocking")}
                  >
                    Program Blocking
                  </Button>
                  <Button
                    variant={
                      visibleSection === "design" ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => sectionClick("design")}
                  >
                    Design
                  </Button>
                  <Button
                    variant={
                      visibleSection === "help" ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => sectionClick("help")}
                  >
                    Help
                  </Button>
                </Stack>
                {visibleSection === "program blocking" && (
                  <>
                    <SelectLabels intent="Blocking Options" />
                    <div
                      id="program blocking"
                      style={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          overflowY: "auto", // Enable vertical scrolling
                          // border: "white 1px solid",
                          p: 2,
                          bgcolor: "rgba(255, 255, 255, 0.0)",
                          borderRadius: "20px",
                          padding: "20px",
                          // backdropFilter: "blur(10px)",
                        }}
                      >
                        <MyImageComponent
                          path="./public/images/opt1-blocking.png"
                          description="A block and stack for option 1"
                        />
                        <Button
                          variant="outlined"
                          onClick={() => showModal(true)}
                        >
                          Show {openModal ? "Less" : "More"}
                        </Button>
                      </Box>
                    </div>
                  </>
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
        {openModal && <ProjectPage showModal={setOpenModal} />}
      </div>
      {/* {openModal && <ProjectModal onClose={showModal} openModal="true" />} */}
    </React.Fragment>
  );
}
