import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import MyImageComponent from "./ImageContainer";

// Example content data structure
const contentData = {
  "program blocking": {
    option1: {
      title: "Blocking Option 1",
      images: [
        {
          path: "/images/opt1-blocking.png",
          description: "A block and stack for option 1",
        },
      ],
      description:
        "The Terrace is envisioned as a welcoming gateway on the west side of the existing Dental Science Complex. The concept centers on the ecology of learning and site, weaving together program and environment into a thoughtful composition of interconnected masses. This approach breaks down the building’s overall scale, creating a more human-centered experience that fosters comfort, connection, and engagement.",
    },
    option2: {
      title: "Blocking Option 2",
      images: [
        {
          path: "/images/opt2-blocking.png",
          description: "A block and stack for option 2",
        },
      ],
      description: "Option 2 blocking description goes here.",
    },
  },
  design: {
    option1: {
      title: "Design Option 1",
      images: [
        {
          path: "/images/opt1-massing.png",
          description: "A block and stack for option 1",
        },
        {
          path: "/images/op1-c02 EDITS.jpg",
          description: "Exterior Rendering",
        },
        {
          path: "/images/op1-c01 EDITS.jpg",
          description: "Exterior Rendering",
        },
        {
          path: "/images/opt1-site.png",
          description: "Exterior Rendering",
        },
      ],
      description:
        "This approach breaks down the building’s overall scale, creating a more human-centered experience that fosters comfort, connection, and engagement.",
    },
    option2: {
      title: "Design Option 2",
      images: [
        {
          path: "/images/opt2-massing.png",
          description: "A block and stack for option 2",
        },
      ],
      description: "Option 2 design description goes here.",
    },
  },
  site: {
    option1: {
      title: "Site",
      images: [
        { path: "/images/opt1-site.png", description: "Site Plan" },
        { path: "/images/site.png", description: "Site Plan" },
      ],
      description: "",
    },
  },
};

export default function ProjectPage({ showModal, content, option }) {
  // Close modal when clicking outside the modal box
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#project-page-modal")) {
        showModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // Fallback to option1 if option is not provided
  const selectedOption = option || "option1";
  const section = contentData[content] && contentData[content][selectedOption];

  return (
    <Container maxWidth="xl" id="project-page-modal">
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
        {section ? (
          <div style={{ padding: "20px" }}>
            <h5>{section.title}</h5>
            {section.images.map((img, idx) => (
              <MyImageComponent
                key={idx}
                path={img.path}
                description={img.description}
              />
            ))}
            {section.description && <p>{section.description}</p>}
          </div>
        ) : (
          <div style={{ padding: "20px 100px" }}>
            <h5>No content available</h5>
          </div>
        )}
      </Box>
    </Container>
  );
}
