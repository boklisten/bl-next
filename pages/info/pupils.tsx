import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../src/components/InfoNav";
import Head from "next/head";

const Pupils: NextPage = () => {
  return (
    <>
      <Head>
        <title>For VGS-elever | Boklisten.no</title>
        <meta
          name="description"
          content="Er du videregående-elev? Finn dine kontaktelever og når utdeling og innsamling skjer."
        />
      </Head>
      <Box>
        <InfoNav />
      </Box>
    </>
  );
};

export default Pupils;
