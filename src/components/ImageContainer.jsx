import { Box } from '@mui/material';

export default function MyImageComponent({ path, description }) {
  return (
    <Box
      component="img"
      src={path}
      alt={description}
      sx={{ width: "100%", height: "auto" }} // Apply Material-UI styling
      style={{ borderRadius: "20px", margin: "20px 0" }}
    />
  );
}