import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
import Head from "next/head";

const Buyback: NextPage = () => {
  return (
    <>
      <Head>
        <title>Innkjøpsliste | Boklisten.no</title>
        <meta
          name="description"
          content="Har du pensumbøker du ikke lenger har bruk for? Vi kjøper inn de aller fleste pensumbøker. Se oversikten over hvilke bøker vi tar imot her."
        />
      </Head>
      <Box>
        <InfoNav />
      </Box>
    </>
  );
};

export default Buyback;
