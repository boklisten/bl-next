"use client";
import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

import { isLoggedIn } from "@/api/auth";
import DynamicLink from "@/components/DynamicLink";
import { MatchesList } from "@/components/matches/matchesList/MatchesList";

const MatchesPage = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <title>Mine overleveringer | Boklisten.no</title>
      <meta name="description" content="Overleveringer av bøker" />
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
              <DynamicLink href={"/auth/login?redirect=matches"}>
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
