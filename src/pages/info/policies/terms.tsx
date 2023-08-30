import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../../components/info/DynamicNav";
import { infoPageTabs, termsAndConditionsTabs } from "../../../utils/constants";
import Head from "next/head";
import Editor from "../../../components/info/Editor";
import { editorData } from "../../../utils/mockData";
import DynamicSubNav from "../../../components/info/DynamicSubNav";

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
        <DynamicSubNav tabs={termsAndConditionsTabs} />
        <Editor rawEditorState={editorData.terms} />
      </Card>
    </>
  );
};

export default Terms;
