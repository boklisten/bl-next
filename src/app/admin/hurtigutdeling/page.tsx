import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "next";

import DynamicLink from "@/components/DynamicLink";
import RapidHandout from "@/components/RapidHandout";
import BL_CONFIG from "@/utils/bl-config";

export const metadata: Metadata = {
  title: "Hurtigutdeling",
  description: "Adminverktøy for å raskt dele ut bøker.",
};

export default function HandoutPage() {
  return (
    <Card sx={{ paddingBottom: 4 }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Hurtigutdeling</Typography>
          <DynamicLink href={BL_CONFIG.blAdmin.basePath}>
            <Button sx={{ mt: 2 }}>tilbake til bl-admin</Button>
          </DynamicLink>
          <RapidHandout />
        </Box>
      </Container>
    </Card>
  );
}
