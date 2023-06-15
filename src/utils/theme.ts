import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

/**
 * Create a theme instance.
 *
 * See typographyVariants.ts for TypeScript definitions for custom typography variants.
 */
const theme = responsiveFontSizes(
  createTheme({
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
    typography: {
      h1: {
        fontSize: "2rem",
        marginTop: "1.6rem",
        marginBottom: "0.6rem",
      },
      h2: {
        fontSize: "1.5rem",
        marginTop: "1.6rem",
        fontWeight: 400,
        marginBottom: "0.2rem",
      },
      h3: {
        fontSize: "1.1rem",
        marginTop: "0.2rem",
        marginBottom: "0.2rem",
      },
      title: {
        fontSize: "4rem",
        marginTop: "4rem",
        marginBottom: "0.6rem",
      },
      cardHeader: {
        fontSize: "1.1rem",
        marginTop: "0.5rem",
        marginBottom: "0.4rem",
        marginBlockStart: "0.5rem",
        marginBlockEnd: "0.45rem",
        fontWeight: "bold",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            title: "h1",
            cardHeader: "h4",
          },
        },
      },
    },
  })
);

export default theme;
