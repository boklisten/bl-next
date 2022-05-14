import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/info/DynamicNav";
import { infoPageTabs } from "../../utils/constants";
import Head from "next/head";
import Editor from "../../components/info/Editor";
import { editorData } from "../../utils/mockData";

const Pupils: NextPage = () => {
  return (
    <>
      <Head>
        <title>For VGS-elever | Boklisten.no</title>
        <meta
          name="description"
          content="Er du videregående-elev? Finn dine kontaktelever og når utdeling og innsamling skjer."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <Editor rawEditorState={editorData.pupils} />
      </Card>
    </>
  );
};

export default Pupils;
