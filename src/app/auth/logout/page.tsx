"use client";
import { Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

import { logout } from "@/api/auth";
import CompanyLogo from "@/components/CompanyLogo";
import CountdownToRedirect from "@/components/CountdownToRedirect";
import BL_CONFIG from "@/utils/bl-config";

// TODO before merge: handle login/logout redirects to and from bl-admin as well
// TODO before merge: handle permission lockouts for bl-admin

export default function LogoutPage() {
  useEffect(() => {
    logout();
  }, []);
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
