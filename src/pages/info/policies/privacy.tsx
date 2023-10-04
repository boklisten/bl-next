import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import DynamicNav from "components/info/DynamicNav";
import DynamicSubNav from "components/info/DynamicSubNav";
import Editor from "components/info/Editor";
import { infoPageTabs, termsAndConditionsTabs } from "utils/constants";
import { editorData } from "utils/mockData";

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Personvernavtale | Boklisten.no</title>
        <meta
          name="description"
          content="Vi tar personvern på alvor. Derfor har vi laget et dokument som viser en oversikt over hvordan din data bir behandlet hos oss."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <DynamicSubNav tabs={termsAndConditionsTabs} />
        <Editor rawEditorState={editorData.privacy} />
      </Card>
    </>
  );
};

export default Terms;
