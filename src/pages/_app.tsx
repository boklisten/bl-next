import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment as DateAdapter } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import { AppProps } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";

import { addAccessToken, addRefreshToken } from "@/api/token";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import store from "@/redux/store";
import theme from "@/utils/theme";
import "@mui/lab";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/globals.css";

class OverriddenAdapter extends DateAdapter {
  // Get years in descending order
  override getYearRange = ([start, end]: [Moment, Moment]) => {
    const startDate = this.moment(start).startOf("year");
    const endDate = this.moment(end).endOf("year");
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "year");
    }

    return years.reverse();
  };
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const { refresh_token, access_token } = router.query;

    if (typeof refresh_token === "string" && typeof access_token === "string") {
      addAccessToken(access_token);
      addRefreshToken(refresh_token);
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router]);

  // Dynamic height variable to fix stupid mobile browsers
  useEffect(() => {
    function setDynamicHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setDynamicHeight();
    window.addEventListener("resize", setDynamicHeight);
    return () => {
      window.removeEventListener("resize", setDynamicHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Boklisten.no</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <LocalizationProvider dateAdapter={OverriddenAdapter}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Box
              sx={{
                minHeight: "100vh",
                backgroundColor: "#efefef",
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
                  <Component {...pageProps} />
                </Box>
              </Container>
            </Box>
            <Box
              sx={{ backgroundColor: "#efefef", height: "1rem", width: "100%" }}
            />
            <Footer />
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    </>
  );
}
