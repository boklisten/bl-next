import { red, orange, grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import type {} from "@mui/lab/themeAugmentation";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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
      warning: {
        main: orange["500"],
        light: orange["100"],
        dark: orange["700"],
        contrastText: grey["900"],
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
      h1: {
        fontSize: "2rem",
        marginTop: "1.6rem",
        marginBottom: "0.2rem",
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
      MuiNativeSelect: {
        styleOverrides: {
          select: {
            // '&' increases specificity
            "&": {
              padding: 1,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          nativeInput: {
            "&": {
              padding: 1,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingX: 5,
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 600,
        lg: 1000,
        xl: 1200,
      },
    },
  }),
);

export default theme;
