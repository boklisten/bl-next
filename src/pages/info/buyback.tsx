import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { SWRConfig } from "swr";

import { fetcher } from "@/api/requests";
import BuybackList, { buybackUrl } from "@/components/info/BuybackList";
import DynamicNav from "@/components/info/DynamicNav";
import { infoPageTabs } from "@/utils/constants";
import { Item } from "@/utils/types";

export const getStaticProps = async () => {
  return {
    props: {
      fallback: {
        [buybackUrl]: await fetcher(buybackUrl),
      },
    },
  };
};

const Buyback: NextPage<{ fallback: { [key: string]: Item[] } }> = ({
  fallback,
}) => {
  return (
    <>
      <Head>
        <title>Innkjøpsliste | Boklisten.no</title>
        <meta
          name="description"
          content="Har du pensumbøker du ikke lenger har bruk for? Vi kjøper inn de aller fleste pensumbøker. Se oversikten over hvilke bøker vi tar imot her."
        />
      </Head>
      <Card>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <SWRConfig value={{ fallback }}>
          <BuybackList />
        </SWRConfig>
      </Card>
    </>
  );
};

export default Buyback;
