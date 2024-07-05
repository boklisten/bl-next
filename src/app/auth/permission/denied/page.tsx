import { Alert, AlertTitle, Card, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";
import Image from "next/image";

import DynamicLink from "@/components/DynamicLink";

export const metadata: Metadata = {
  title: "Du har ikke tilgang til denne siden | Boklisten.no",
  description:
    "Vi klarte ikke å logge deg inn. Vennligst prøv på nytt eller ta kontakt hvis problemet vedvarer.",
};

export default function PermissionDeniedPage() {
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
          <Alert severity={"error"} sx={{ my: 2 }}>
            <AlertTitle>Du har tilgang til å se dette innholdet</AlertTitle>
            Du forsøke å logge inn med en annen bruker eller ta kontakt med
            administrator for spørsmål.
          </Alert>
          <DynamicLink href={"/auth/login"}>
            Tilbake til innloggingssiden
          </DynamicLink>
        </Box>
      </Container>
    </Card>
  );
}
