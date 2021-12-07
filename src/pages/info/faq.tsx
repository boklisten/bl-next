import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../constants";
import Head from "next/head";
import EditableQNA from "components/EditableQNA";
import { QNAs } from "mockData";

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
      <Card>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <EditableQNA QNAs={QNAs} />
      </Card>
    </>
  );
};

export default FAQ;
