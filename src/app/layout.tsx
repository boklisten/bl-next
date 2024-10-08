import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/system";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import * as React from "react";

import AuthLinker from "@/components/AuthLinker";
import CustomThemeProvider from "@/components/CustomThemeProvider";
import DynamicHeightProvider from "@/components/DynamicHeightProvider";
import Footer from "@/components/Footer";
import CustomLocalizationProvider from "@/components/LocalizationProvider";
import NavBar from "@/components/NavBar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Boklisten.no",
    default: "Boklisten.no",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no">
      <body>
        <Suspense>
          <DynamicHeightProvider>
            <CustomLocalizationProvider>
              <CustomThemeProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Box
                  sx={{
                    minHeight: "100vh",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <NavBar />
                  <Container
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      alignItems: "stretch",
                      paddingX: 0,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <AuthLinker>{children}</AuthLinker>
                    </Box>
                  </Container>
                </Box>
                <Box
                  sx={{
                    height: 2,
                    width: "100%",
                  }}
                />
                <Footer />
              </CustomThemeProvider>
            </CustomLocalizationProvider>
          </DynamicHeightProvider>
        </Suspense>
      </body>
    </html>
  );
}
