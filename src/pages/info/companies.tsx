import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import DynamicNav from "components/info/DynamicNav";
import Editor from "components/info/Editor";
import { infoPageTabs } from "utils/constants";
import { editorData } from "utils/mockData";

const Companies: NextPage = () => {
  return (
    <>
      <Head>
        <title>For skolekunder | Boklisten.no</title>
        <meta
          name="description"
          content="Er du ansvarlig for en videregående eller privatist-skole? Vi tilbyr en rekke nyttige tjenester til dere! Les om våre tilbud til skoler, hvordan utlånsordningen fungrer og hvordan dere kan kjøpe bøker fra skyvearkivet."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <Editor rawEditorState={editorData.companies} />
      </Card>
    </>
  );
};

export default Companies;
