import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import DynamicNav from "components/info/DynamicNav";
import EditableQNA from "components/info/EditableQna";
import { infoPageTabs } from "utils/constants";
import { QNAs } from "utils/mockData";

const FAQ: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spørsmål og svar | Boklisten.no</title>
        <meta
          name="description"
          content="Hva betyr det at Boklisten alltid leverer riktig bok? Hvordan bestiller jeg bøker som privatist?"
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <EditableQNA QNAs={QNAs} />
      </Card>
    </>
  );
};

export default FAQ;
