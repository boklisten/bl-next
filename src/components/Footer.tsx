import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
  return (
    <Box
      data-testid="footer"
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
