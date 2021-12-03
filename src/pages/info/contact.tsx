import { Box } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../constants";
import Head from "next/head";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kontakt oss | Boklisten.no</title>
        <meta
          name="description"
          content="Vi er tilgjengelig for spørsmål og henvendelser både på epost og telefon. Se vår kontaktinformasjon, med epost-adresse, telefonnummer og gateadresse."
        />
      </Head>
      <Box>
        <DynamicNav tabs={infoPageTabs} twoRows />
      </Box>
    </>
  );
};

export default Contact;
