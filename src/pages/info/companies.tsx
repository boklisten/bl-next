import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
import Head from "next/head";

const Companies: NextPage = () => {
  return (
    <>
      <Head>
        <title>For skolekunder | Boklisten.no</title>
        <meta
          name="description"
          content="Er du ansvarlig for en videregående eller privatist-skole? Vi tilbyr en rekke nyttige tjenester til dere! Les om våre tilbud til skoler, hvordan utlånsordningen fungrer og hvordan dere kan kjøpe bøker fra skyvearkivet."
        />
      </Head>
      <Box>
        <InfoNav />
      </Box>
    </>
  );
};

export default Companies;
