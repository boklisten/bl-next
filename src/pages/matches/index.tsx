import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { isLoggedIn } from "api/auth";
import DynamicLink from "components/DynamicLink";
import { MatchesList } from "components/matches/matchesList/MatchesList";
import BL_CONFIG from "utils/bl-config";

const MatchesPage: NextPage = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <Head>
        <title>Mine overleveringer | Boklisten.no</title>
        <meta name="description" content="Overleveringer av bøker" />
      </Head>
      <div style={{ padding: "1rem" }}>
        <Typography variant="h1">Mine overleveringer</Typography>
        {hydrated &&
          (isLoggedIn() ? (
            <MatchesList />
          ) : (
            <>
              <Alert severity="info">
                Du må logge inn for å se overleveringene dine
              </Alert>
              <DynamicLink href={`${BL_CONFIG.blWeb.basePath}overleveringer`}>
                <Button variant={"contained"} sx={{ mt: "1rem" }}>
                  Logg inn
                </Button>
              </DynamicLink>
            </>
          ))}
      </div>
    </>
  );
};

export default MatchesPage;
