import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import ConstructionIcon from "@mui/icons-material/Construction";
import Head from "next/head";

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
        <ConstructionIcon color="warning" fontSize="large" />
        <Typography variant="h4" sx={{ margin: 5 }}>
          Her kommer nye Boklisten.no!
        </Typography>
        <ConstructionIcon color="warning" fontSize="large" />
      </Box>
    </>
  );
};

export default Home;
