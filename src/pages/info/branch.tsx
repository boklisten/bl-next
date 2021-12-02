import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
import Head from "next/head";

const Branch: NextPage = () => {
  return (
    <>
      <Head>
        <title>Skoler og åpningstider | Boklisten.no</title>
        <meta
          name="description"
          content="Skal du hente eller levere bøker? Finn ut når vi står på stand på din skole."
        />
      </Head>
      <Box>
        <InfoNav />
      </Box>
    </>
  );
};

export default Branch;
