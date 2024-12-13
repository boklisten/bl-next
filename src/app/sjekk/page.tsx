import { Card, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";
import React from "react";

import PublicBlidSearch from "@/components/search/PublicBlidSearch";

export const metadata: Metadata = {
  title: "Boksøk",
  description: "Sjekk hvem bøker utdelt fra Boklisten tilhører",
};

export default function PublicBlidSearchPage() {
  return (
    <Card sx={{ paddingBottom: 4 }}>
      <Container component="main" maxWidth="xs">
        <Stack
          sx={{
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="h1">Boksøk</Typography>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <PublicBlidSearch />
          </Box>
        </Stack>
      </Container>
    </Card>
  );
}
