import { Box } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../constants";
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
        <DynamicNav tabs={infoPageTabs} twoRows />
      </Box>
    </>
  );
};

export default Branch;
