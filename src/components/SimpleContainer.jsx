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

export default function SimpleContainer(props) {
  const [isShown, setIsShown] = useState(false);
  const [visibleSection, setVisibleSection] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");

  const handleClick = () => {
    setIsShown((current) => !current);
    setVisibleSection(null); // Hide all sections when toggling main panel
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
                  {/* Site Tab */}
                  <Button
                    variant={
                      visibleSection === "site" ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => {
                      // sectionClick("site");
                      showModal(false);
                      setOpenModal(false);
                      setVisibleSection("site");
                    }}
                  >
                    Site
                  </Button>
                  {/* Program Blocking Tab */}
                  <Button
                    variant={
                      visibleSection === "program blocking"
                        ? "contained"
                        : "outlined"
                    }
                    size="small"
                    onClick={() => {
                      // sectionClick("program blocking");
                      showModal(false);
                      setOpenModal(false);
                      setVisibleSection("program blocking");
                      props.tabChange("Program Blocking");
                    }}
                  >
                    Program Blocking
                  </Button>

                  {/* Design Tab */}
                  <Button
                    variant={
                      visibleSection === "design" ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => {
                      // sectionClick("design");
                      showModal(false);
                      setOpenModal(false);
                      setVisibleSection("design");
                      props.tabChange("Design");
                    }}
                  >
                    Design
                  </Button>
                </Stack>

                {/* Content Section */}
                {visibleSection === "program blocking" && (
                  <>
                    <SelectLabels intent="Blocking Option" />
                    <div id="program blocking" className="overview">
                      <MyImageComponent
                        path="./public/images/opt1-blocking.png"
                        description="A block and stack for option 1"
                      />
                      <Button
                        variant="outlined"
                        onClick={() => {
                          showModal(true);
                        }}
                      >
                        Show {openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
                {visibleSection === "design" && (
                  <>
                    <SelectLabels intent="Design Options" />
                    <div id="design">
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
                      <Button
                        variant="outlined"
                        onClick={() => {
                          showModal(true);
                          console.log(visibleSection);
                        }}
                      >
                        Show {openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
                {visibleSection === "site" && (
                  <>
                    <div id="site" style={{ marginTop: "20px" }}>
                      <MyImageComponent
                        path="./public/images/site.png"
                        description="A block and stack for option 1"
                      />
                      <p> Blah blah blah - cool site - blah blah blah</p>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          showModal(true);
                          console.log(visibleSection);
                        }}
                      >
                        Show {openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </Box>
        </Container>
        {openModal && (
          <ProjectPage
            showModal={setOpenModal}
            content={visibleSection}
            option={option}
          />
        )}
      </div>
      {/* {openModal && <ProjectModal onClose={showModal} openModal="true" />} */}
    </React.Fragment>
  );
}
