import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../constants";
import Head from "next/head";
import Editor from "../../components/Editor";
import { editorData } from "../../mockData";

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
        <DynamicNav tabs={infoPageTabs} twoRows />
        <Editor rawEditorState={editorData.general} />
      </Card>
    </>
  );
};

export default General;
