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
        marginTop: 3.2,
        marginBottom: 1.2,
      },
      h2: {
        fontSize: "1.5rem",
        marginTop: 3.2,
        fontWeight: 400,
        marginBottom: 0.4,
      },
      h3: {
        fontSize: "1.1rem",
        marginTop: 0.4,
        marginBottom: 0.4,
      },
      title: {
        fontSize: "4rem",
        marginTop: 8,
        marginBottom: 1.2,
      },
      cardHeader: {
        fontSize: "1.1rem",
        marginTop: 1,
        marginBottom: 0.8,
        marginBlockStart: 1,
        marginBlockEnd: 0.9,
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
