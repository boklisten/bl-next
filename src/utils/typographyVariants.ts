/**
 * This file extends the TS definitions for MUI typography to our new variants.
 * @see theme
 */
import React from "react";

// used for module JSdoc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import theme from "utils/theme";

declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants {
    cardHeader: React.CSSProperties;
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariantsOptions {
    cardHeader?: React.CSSProperties;
    title?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    cardHeader: true;
    title: true;
  }
}
