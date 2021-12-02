import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
import Head from "next/head";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Om oss | Boklisten.no</title>
        <meta
          name="description"
          content="Boklisten har mange års erfaring med kjøp og salg av pensumbøker. Les om vår historie, hvem vi er, og hva vi tilbyr."
        />
      </Head>
      <Box>
        <InfoNav />
      </Box>
    </>
  );
};

export default About;
