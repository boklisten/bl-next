"use client";
import { Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core";

import AdminNavigationCards from "@/components/AdminNavigationCards";

export default function AdminStartPage() {
  return (
    <PageContainer>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Velkommen til <b>bl-admin</b>, Boklisten sitt administrasjonssystem for
        bøker!
      </Typography>
      <Typography variant={"subtitle1"} sx={{ textAlign: "center" }}>
        Trykk på et verktøy for å komme i gang!
      </Typography>
      <AdminNavigationCards />
    </PageContainer>
  );
}
