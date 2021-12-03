import { Card } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
import Head from "next/head";
import Editor from "../../components/Editor";
import { editorData } from "../../mockData";

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
      <Card>
        <InfoNav />
        <Editor rawEditorState={editorData.pupils} />
      </Card>
    </>
  );
};

export default Pupils;
