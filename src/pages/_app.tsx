import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { AppProps } from "next/dist/shared/lib/router/router";
import NavBar from "../components/NavBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "components/Footer";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line unicorn/prevent-abbreviations
export default function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Boklisten.no</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#FFFAFA",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <NavBar />
          <Container
            sx={{ display: "flex", flexGrow: 1, alignItems: "stretch" }}
          >
            <Box sx={{ width: "100%" }}>
              <Component {...pageProps} />
            </Box>
          </Container>
        </Box>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
