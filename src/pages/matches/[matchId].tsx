import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import MatchDetail from "components/matches/MatchDetail";

export async function getServerSideProps({
  params,
}: {
  params: { matchId: string };
}) {
  return {
    props: { matchID: params.matchId },
  };
}

const MatchDetailPage: NextPage<{ matchID: string }> = ({ matchID }) => {
  return (
    <>
      <Head>
        <title>Overlevering av bøker | Boklisten.no</title>
        <meta name="description" content="Overlevering av bøker" />
      </Head>
      <MatchDetail matchId={matchID} />
    </>
  );
};

export default MatchDetailPage;
