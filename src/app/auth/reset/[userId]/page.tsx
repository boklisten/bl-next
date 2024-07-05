import { Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";
import Image from "next/image";

import PasswordReset from "@/components/user/PasswordReset";

export const metadata: Metadata = {
  title: "Lag nytt passord | Boklisten.no",
  description: "Lag et nytt passord, slik at du får tilgang på kontoen din.",
};

export default function PasswordResetPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <Card sx={{ paddingBottom: "2rem" }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
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
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Lag nytt passord
          </Typography>
          <PasswordReset userId={params.userId} />
        </Box>
      </Container>
    </Card>
  );
}
