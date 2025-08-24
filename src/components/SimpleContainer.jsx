import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SelectLabels from "./SelectLabels";
import MyImageComponent from "./ImageContainer";

export default function SimpleContainer() {
  const [isShown, setIsShown] = useState(false);
  const [visibleSection, setVisibleSection] = useState(null);

  const handleClick = () => {
    setIsShown((current) => !current);
    setVisibleSection(null); // Hide all sections when toggling main panel
  };

  const sectionClick = (section) => {
    setVisibleSection((current) => (current === section ? null : section));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{ bgcolor: "rgba(255, 255, 255, 0.4)" }}
          style={{
            borderRadius: "20px",
            padding: "20px",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "white 1px solid",
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            size="medium"
            onClick={handleClick}
          >
            <AddIcon />
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
                  variant={visibleSection === "help" ? "contained" : "outlined"}
                  onClick={() => sectionClick("help")}
                >
                  Help
                </Button>
              </Stack>
              {visibleSection === "program blocking" && (
                <div id="program blocking">
                  <SelectLabels intent="Blocking Options" />
                  <MyImageComponent
                    path="./public/images/opt1-blocking.png"
                    description="A block and stack for option 1"
                  />
                  <p>
                    {" "}
                    The Terrace is envisioned as a welcoming gateway on the west
                    side of the existing Dental Science Complex. The concept centers on the ecology of
                    learning and site, weaving together program and environment
                    into a thoughtful composition of interconnected masses. This
                    approach breaks down the building’s overall scale, creating
                    a more human-centered experience that fosters comfort,
                    connection, and engagement within the learning environment.
                  </p>
                </div>
              )}
              {visibleSection === "design" && (
                <div id="design">
                  <SelectLabels intent="Design Options" />
                </div>
              )}
              {visibleSection === "help" && <div id="help"></div>}
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
