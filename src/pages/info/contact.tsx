import { Card, Typography } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../utils/constants";
import Head from "next/head";
import ContactInfo from "components/ContactInfo";

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
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
        >
          Kontakt oss
        </Typography>
        <ContactInfo />
      </Card>
    </>
  );
};

export default Contact;
