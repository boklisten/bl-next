import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../../components/info/DynamicNav";
import { infoPageTabs, termsAndConditionsTabs } from "../../../utils/constants";
import Head from "next/head";
import Editor from "../../../components/info/Editor";
import { editorData } from "../../../utils/mockData";

const Policies: NextPage = () => {
  return (
    <>
      <Head>
        <title>Betingelser | Boklisten.no</title>
        <meta
          name="description"
          content="Vi tar kundene våre på alvor. Derfor har vi laget detaljerte betingelser, slik at du vet hva som gjelder for din ordre."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <DynamicNav tabs={termsAndConditionsTabs} />
        <Editor rawEditorState={editorData.conditions} />
      </Card>
    </>
  );
};

export default Policies;
