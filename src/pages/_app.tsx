import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../utils/theme";
import { AppProps } from "next/dist/shared/lib/router/router";
import NavBar from "../components/NavBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "components/Footer";
import { AdapterMoment as DateAdapter } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import { Provider } from "react-redux";
import store from "redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "@mui/lab";

class OverriddenAdapter extends DateAdapter {
  // Get years in decending order
  override getYearRange = (start: Moment, end: Moment) => {
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
