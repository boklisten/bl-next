import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import DynamicLink from "../components/DynamicLink";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Boklisten.no - Alltid riktig bok</title>
        <meta
          name="description"
          content="Er du privatist eller videregående-elev på utkikk etter pensumbøker? Vi i Boklisten hjelper deg med å finne riktig bok."
        />
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ position: "fixed" }}>
          <Image
            src="/banner-placeholder.jpg"
            width={960}
            height={250}
            alt="Banner"
          />
        </Box>
        <Box sx={{ zIndex: 100 }}>
          <Typography variant="h2" sx={{ margin: 5 }}>
            Alltid riktig bok!
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: 5 }}>
            Vi i Boklisten.no er veldig opptatt av lærebøker, derfor vil vi
            gjøre det så enkelt som mulig for deg å få tak i dem.
          </Typography>
          <DynamicLink href={"https://www.boklisten.no/welcome"}>
            Til gamle boklisten.no
          </DynamicLink>
        </Box>
      </Box>
    </>
  );
};

export default Home;
