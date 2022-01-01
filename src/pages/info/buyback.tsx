import { Card } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../utils/constants";
import Head from "next/head";
import BuybackList from "components/BuybackList";
import { Item } from "utils/types";
import useSWR, { SWRResponse } from "swr";
import BL_CONFIG from "utils/bl-config";
import axios from "axios";

const Buyback: NextPage = () => {
  const { data, error }: SWRResponse = useSWR(
    `${BL_CONFIG.api.basePath}items?buyback=true&og=title&og=price&og=info.isbn`,
    axios.get
  );
  const items = data?.data?.data;
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
        <BuybackList
          items={items
            ?.sort((a: Item, b: Item) => a.title.localeCompare(b.title))
            .map((item: Item) => ({ isbn: item.info.isbn, title: item.title }))}
          error={error}
        />
      </Card>
    </>
  );
};

export default Buyback;
