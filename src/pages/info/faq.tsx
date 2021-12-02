import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
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
        <InfoNav />
      </Box>
    </>
  );
};

export default FAQ;
