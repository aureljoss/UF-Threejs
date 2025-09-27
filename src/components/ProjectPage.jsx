import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import MyImageComponent from "./ImageContainer";

// Example content data structure
const contentData = {
  "Program Blocking": {
    option1: {
      title: "Blocking Option 1",
      images: [
        {
          path: "/images/opt1-blocking.png",
          description: "A block and stack for option 1",
        },
      ],
      description:
        "Option 1 is envisioned as a welcoming gateway on the west side of the existing Dental Science Complex. \n The concept centers on the ecology of learning and site, weaving together program and environment into a thoughtful composition of interconnected masses. This approach breaks down the building’s overall scale, creating a more human-centered experience that fosters comfort, connection, and engagement.",
    },
    option2: {
      title: "Blocking Option 2",
      images: [
        {
          path: "/images/Opt2-blocking.png",
          description: "A block and stack for option 2",
        },
      ],
      description: "Option 2 blocking description goes here.",
    },
  },
  Design: {
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
        "Option 1 breaks down the building’s overall scale, creating a more human-centered experience that fosters comfort, connection, and engagement.",
    },
    option2: {
      title: "Design Option 2",
      images: [
        {
          path: "/images/opt2-massing.png",
          description: "A block and stack for option 2",
        },
        {
          path: "/images/opt2-design.png",
          description: "Exterior Rendering",
        },
        {
          path: "/images/opt2-arial.png",
          description: "Exterior Rendering",
        },
      ],
      description: [
        "Option 2 engages the site and users through a grand front door and promenave that signals the scale and prominence of the program and activities. \n A single complex interior space called the forum brings all learners, researchers, and teachers to an organizing center that creates identities to all programs and uses. \n The canopy creates a formal entry portico while also shading the south side of the building to enable more transparency.  ",
      ],
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
  camera: {
    option1: {
      title: "Option 1 - View from Archer Rd",
      images: [
        {
          path: "/images/op1-c02 EDITS.jpg",
          description: "View from Archer Rd",
        },
      ],
      description: "",
    },
    option2: {
      title: "Option 2 - View from Archer Rd",
      images: [
        {
          path: "/images/opt2-design.png",
          description: "View from Archer Rd",
        },
      ],
      description: "",
    },
  },
};

export default function ProjectPage({ setShowModal, content, option }) {
  // Close modal when clicking outside the modal box
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest("#project-page-modal") &&
        !event.target.closest("#simple-container")
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowModal]);

  // Fallback to option1 if option is not provided
  const selectedOption = `option${option}` || "option1";
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
          onClick={() => setShowModal(false)}
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
            {section.description && (
              <p style={{ whiteSpace: "pre-line" }}>{section.description}</p>
            )}
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
