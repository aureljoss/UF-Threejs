import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{ bgcolor: "rgba(255, 255, 255, 0.8)" }}
          style={{
            borderRadius: "20px",
            padding: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="text">Introduction</Button>
            <Button variant="contained">Design</Button>
            <Button variant="outlined">Help</Button>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
