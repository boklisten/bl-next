"use client";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { isLoggedIn } from "@/api/auth";
import DynamicLink from "@/components/DynamicLink";
import { MatchesList } from "@/components/matches/matchesList/MatchesList";

export default function Matches() {
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // Wait for AuthLinker
    if (searchParams.size > 0) {
      return;
    }
    setHydrated(true);
  }, [searchParams.size]);

  return (
    hydrated &&
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
    ))
  );
}
