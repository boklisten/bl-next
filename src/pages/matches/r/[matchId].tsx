import { NextPage } from "next";
import MatchPage from "../../../components/matches/MatchPage";
import Head from "next/head";
import React from "react";

export async function getServerSideProps({
  params,
}: {
  params: { matchId: string };
}) {
  return {
    props: { matchID: params.matchId },
  };
}

const DeliveryPage: NextPage<{ matchID: string }> = ({ matchID }) => {
  return (
    <>
      <Head>
        <title>Mottak av bøker | Boklisten.no</title>
        <meta name="description" content="Avlevering av bøker" />
      </Head>
      <MatchPage matchID={matchID} receive={true} />
    </>
  );
};

export default DeliveryPage;
