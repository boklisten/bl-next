import { Card, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";

import CompanyLogo from "@/components/CompanyLogo";
import EmailConfirmer from "@/components/EmailConfirmer";

export const metadata: Metadata = {
  title: "Bekreft e-post | Boklisten.no",
  description:
    "Bekreft din e-post-adresse, slik at du får viktig informasjon fra oss.",
};

export default function TokenPage({
  params,
}: {
  params: { confirmationId: string };
}) {
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
          <CompanyLogo />
          <EmailConfirmer confirmationId={params.confirmationId} />
        </Box>
      </Container>
    </Card>
  );
}
