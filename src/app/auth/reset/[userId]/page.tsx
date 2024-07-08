import { Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";

import PasswordReset from "@/components/user/PasswordReset";

export const metadata: Metadata = {
  title: "Lag nytt passord",
  description: "Lag et nytt passord, slik at du får tilgang på kontoen din.",
};

export default function PasswordResetPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <Card sx={{ paddingBottom: 4 }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Lag nytt passord
          </Typography>
          <PasswordReset userId={params.userId} />
        </Box>
      </Container>
    </Card>
  );
}
