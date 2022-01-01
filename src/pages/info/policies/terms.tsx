import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../../components/DynamicNav";
import { infoPageTabs, termsAndConditionsTabs } from "../../../utils/constants";
import Head from "next/head";
import Editor from "../../../components/Editor";
import { editorData } from "../../../utils/mockData";

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vilkår | Boklisten.no</title>
        <meta
          name="description"
          content="Når du handler hos oss gjelder noen vilkår. Disse er her for å gi alle parter trygghet for hvilke regler som gjelder."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <DynamicNav tabs={termsAndConditionsTabs} />
        <Editor rawEditorState={editorData.terms} />
      </Card>
    </>
  );
};

export default Terms;
