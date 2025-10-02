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
import SelectLabels from "./SelectLabels";
import MyImageComponent from "./ImageContainer";
import ProjectPage from "./ProjectPage";

export default function UIContainer(props) {
  const [isShown, setIsShown] = useState(true);

  const handleClick = () => {
    setIsShown((current) => !current);
    props.setVisibleSection(null); // Hide all sections when toggling main panel
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
        <Container maxWidth="xs" id="simple-container">
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
                      props.visibleSection === "site" ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => {
                      props.tabChange("site");
                      props.setOption("1");
                      props.setOpenModal(false);
                      props.setVisibleSection("site");
                    }}
                  >
                    Site
                  </Button>
                  {/* Program Blocking Tab */}
                  <Button
                    variant={
                      props.visibleSection === "Program Blocking"
                        ? "contained"
                        : "outlined"
                    }
                    size="small"
                    onClick={() => {
                      // sectionClick("program blocking");
                      // props.setOpen(false);
                      props.setOpenModal(false);
                      props.setOption("1");
                      props.setVisibleSection("Program Blocking");
                      props.tabChange("Program Blocking");
                    }}
                  >
                    Program Blocking
                  </Button>

                  {/* Design Tab */}
                  <Button
                    variant={
                      props.visibleSection === "Design"
                        ? "contained"
                        : "outlined"
                    }
                    size="small"
                    onClick={() => {
                      // sectionClick("design");
                      // props.showModal(false);
                      props.setOpenModal(false);
                      props.setOption("1");
                      props.setVisibleSection("Design");
                      props.tabChange("Design");
                    }}
                  >
                    Design
                  </Button>
                </Stack>

                {/* Content Section */}
                {props.visibleSection === "Program Blocking" && (
                  <>
                    <SelectLabels
                      intent="Program Blocking Options"
                      value={props.option}
                      onChange={(selected) => {
                        props.setOption(selected);
                        props.optionChange(selected); // <-- send to parent
                      }}
                    />
                    <div id="program blocking" className="overview">
                      <MyImageComponent
                        path={
                          props.option === "1"
                            ? "./images/opt1-blocking.png"
                            : "./images/Opt2-blocking.png"
                        }
                        description={
                          props.option === "1"
                            ? "A block and stack for option 1"
                            : "A block and stack for option 2"
                        }
                      />
                      <Button
                        variant="outlined"
                        onClick={() => {
                          props.setOpenModal(!props.openModal);
                        }}
                      >
                        Show {props.openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
                {props.visibleSection === "Design" && (
                  <>
                    <SelectLabels
                      intent="Design Options"
                      value={props.option}
                      onChange={(selected) => {
                        props.setOption(selected);
                        props.optionChange(selected);
                      }}
                    />
                    <div id="design">
                      <MyImageComponent
                        path={
                          props.option === "1"
                            ? "./images/opt1-massing.png"
                            : "./images/opt2-massing.png"
                        }
                        description={
                          props.option === "1"
                            ? "Design for option 1"
                            : "Design for option 2"
                        }
                      />
                      <Button
                        variant="outlined"
                        onClick={() => {
                          props.setOpenModal(!props.openModal);
                        }}
                      >
                        Show {props.openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
                {props.visibleSection === "camera" && (
                  <>
                    <SelectLabels
                      intent="Design Options"
                      value={props.option}
                      onChange={(selected) => {
                        props.setOption(selected);
                        props.optionChange(selected);
                      }}
                    />
                    <div id="design">
                      <MyImageComponent
                        path={
                          props.option === "1"
                            ? "./images/opt1-massing.png"
                            : "./images/opt2-massing.png"
                        }
                        description={
                          props.option === "1"
                            ? "Design for option 1"
                            : "Design for option 2"
                        }
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
                          props.setOpenModal(true);
                        }}
                      >
                        Show {props.openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
                {props.visibleSection === "site" && (
                  <>
                    <div id="site" style={{ marginTop: "20px" }}>
                      <MyImageComponent
                        path="./images/site.png"
                        description="A block and stack for option 1"
                      />
                      {/* <p> Blah blah blah - cool site - blah blah blah</p> */}
                      <Button
                        variant="outlined"
                        onClick={() => {
                          props.setOpenModal(true);
                        }}
                      >
                        Show {props.openModal ? "Less" : "More"}
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </Box>
        </Container>
        {props.openModal && (
          <ProjectPage
            setShowModal={props.setOpenModal}
            content={props.visibleSection}
            option={props.option}
          />
        )}
      </div>
    </React.Fragment>
  );
}
