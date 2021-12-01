import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" component="div" color="white">
        Footer
      </Typography>
    </Box>
  );
}
