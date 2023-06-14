import { NextPage } from "next";
import Head from "next/head";
import { MatchesList } from "../../components/matches/matchesList/MatchesList";
import React from "react";
import { Typography } from "@mui/material";

const MatchesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mine overleveringer | Boklisten.no</title>
        <meta name="description" content="Overleveringer av bøker" />
      </Head>
      <div style={{ padding: "1rem" }}>
        <Typography variant="h1">Mine overleveringer</Typography>
        <MatchesList />
      </div>
    </>
  );
};

export default MatchesPage;
