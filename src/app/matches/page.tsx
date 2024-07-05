import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";
import React, { Suspense } from "react";

import Matches from "@/components/matches/Matches";

export const metadata: Metadata = {
  title: "Mine overleveringer | Boklisten.no",
  description: "Overleveringer av bøker",
};

export default function MatchesPage() {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h1">Mine overleveringer</Typography>
      <Suspense>
        <Matches />
      </Suspense>
    </Box>
  );
}
