import { Box } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../constants";
import Head from "next/head";

const FAQ: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spørsmål og svar | Boklisten.no</title>
        <meta
          name="description"
          content="Hva betyr det at Boklisten alltid leverer riktig bok? Hvordan bestiller jeg bøker som privatist?"
        />
      </Head>
      <Box>
        <DynamicNav tabs={infoPageTabs} twoRows />
      </Box>
    </>
  );
};

export default FAQ;
