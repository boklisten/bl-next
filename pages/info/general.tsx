import { Card } from "@mui/material";
import Editor from "../../src/components/Editor";
import type { NextPage } from "next";
import InfoNav from "../../src/components/InfoNav";
import Head from "next/head";

const General: NextPage = () => {
  return (
    <>
      <Head>
        <title>Generell informasjon | Boklisten.no</title>
        <meta
          name="description"
          content="Velkommen til Boklisten.no! Her kan du enkelt kjøpe pensumbøker. Les om vårt konsept, og hvilke tjenester vi tilbyr her."
        />
      </Head>
      <Card>
        <InfoNav />
        <Editor />
      </Card>
    </>
  );
};

export default General;
