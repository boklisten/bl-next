import { Card, CircularProgress, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import AuthVerifier from "@/components/AuthVerifier";

export const metadata: Metadata = {
  title: "Logger inn... | Boklisten.no",
  description: "Du blir nå logget inn. Vennligst vent.",
};

export default function TokenPage() {
  return (
    <Card sx={{ paddingBottom: "2rem" }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/boklisten_logo_v2_icon_blue.png"
            width={50}
            height={50}
            alt="logo"
          />
          <Typography component="h1" variant="h5" sx={{ my: 1 }}>
            Du blir nå logget inn...
          </Typography>
          <CircularProgress />
          <Suspense>
            <AuthVerifier />
          </Suspense>
        </Box>
      </Container>
    </Card>
  );
}
