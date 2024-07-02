import { Item } from "@boklisten/bl-model";
import { Card } from "@mui/material";
import { Metadata } from "next";

import { fetcher } from "@/api/requests";
import BuybackList from "@/components/info/BuybackList";
import DynamicNav from "@/components/info/DynamicNav";
import BL_CONFIG from "@/utils/bl-config";
import { infoPageTabs } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Innkjøpsliste | Boklisten.no",
  description:
    "Har du pensumbøker du ikke lenger har bruk for? Vi kjøper inn de aller fleste pensumbøker. Se oversikten over hvilke bøker vi tar imot her.",
};

const BuybackPage = async () => {
  const buybackItems = await fetcher<Item[]>(
    `${BL_CONFIG.api.basePath}items?buyback=true&sort=title`,
  );

  return (
    <>
      <Card>
        <DynamicNav tabs={infoPageTabs} twoRows />
        <BuybackList defaultBuybackItems={buybackItems ?? []} />
      </Card>
    </>
  );
};

export default BuybackPage;
