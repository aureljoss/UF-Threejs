import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

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
                  variant="contained"
                  onClick={() => sectionClick("introduction")}
                >
                  Introduction
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => sectionClick("design")}
                >
                  Design
                </Button>
                <Button variant="outlined" onClick={() => sectionClick("help")}>
                  Help
                </Button>
              </Stack>
              {visibleSection === "introduction" && (
                <div id="introduction">
                  <h5>Introduction</h5>
                </div>
              )}
              {visibleSection === "design" && (
                <div id="design">
                  <h5>Design</h5>
                </div>
              )}
              {visibleSection === "help" && (
                <div id="help">
                  <h5>Help</h5>
                </div>
              )}
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
