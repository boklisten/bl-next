import { Card } from "@mui/material";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import DynamicNav from "../../components/DynamicNav";
import { infoPageTabs } from "../../utils/constants";
import Head from "next/head";
import BuybackList from "components/BuybackList";
import { get } from "api/api";
import { Item } from "utils/types";

export const getServerSideProps: GetServerSideProps = async () => {
  let response;
  try {
    response = await get(
      "items",
      "?buyback=true&og=title&og=price&og=info.isbn"
    );
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
      },
    };
  }
  if (!response.data) {
    return {
      props: {
        data: [],
      },
    };
  }

  return {
    props: response.data,
  };
};

const Buyback: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
          items={data
            ?.sort((a: Item, b: Item) => a.title.localeCompare(b.title))
            .map((item: Item) => ({ isbn: item.info.isbn, title: item.title }))}
        />
      </Card>
    </>
  );
};

export default Buyback;
