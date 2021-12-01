import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#26768f",
    },
    secondary: {
      main: "#283d3b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
