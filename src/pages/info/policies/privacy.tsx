import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../../components/DynamicNav";
import { infoPageTabs, termsAndConditionsTabs } from "../../../constants";
import Head from "next/head";
import Editor from "../../../components/Editor";
import { editorData } from "../../../mockData";

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Betingelser | Boklisten.no</title>
        <meta
          name="description"
          content="Vi tar personvern på alvor. Derfor har vi laget et dokument som viser en oversikt over hvordan din data bir behandlet hos oss."
        />
      </Head>
      <Card>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <DynamicNav tabs={termsAndConditionsTabs} />
        <Editor rawEditorState={editorData.privacy} />
      </Card>
    </>
  );
};

export default Terms;
