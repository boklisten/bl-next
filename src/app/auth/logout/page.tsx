"use client";
import { Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

import { logout } from "@/api/auth";
import CountdownToRedirect from "@/components/CountdownToRedirect";
import BL_CONFIG from "@/utils/bl-config";

export default function LogoutPage() {
  useEffect(() => {
    logout();
  }, []);
  return (
    <Card sx={{ paddingBottom: 4 }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Du er nå logget ut
          </Typography>
          <CountdownToRedirect
            path={`${BL_CONFIG.blWeb.basePath}?logout=true`}
            seconds={3}
          />
        </Box>
      </Container>
    </Card>
  );
}
