import CopyrightIcon from "@mui/icons-material/Copyright";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Image from "next/image";
import React from "react";

import DynamicLink from "@/components/DynamicLink";
import ContactInfo from "@/components/info/ContactInfo";

export default function Footer() {
  return (
    <Card
      data-testid="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <ContactInfo />
      <Box sx={{ marginBottom: ".7rem" }}>
        <DynamicLink href={"/info/policies/conditions"}>
          Betingelser
        </DynamicLink>
        {" | "}
        <DynamicLink href={"/info/policies/terms"}>Vilkår</DynamicLink>
        {" | "}
        <DynamicLink href={"/info/policies/privacy"}>
          Personvernserklæring
        </DynamicLink>
      </Box>
      <Image
        width={200}
        height={72}
        src="/DIBS_shop_vertical_EN_10.png"
        alt="Dibs easy logo"
      />
      <Typography sx={{ marginTop: ".7rem" }}>
        Organisasjonsnummer: 912047385 MVA
      </Typography>
      <Typography sx={{ display: "flex", gap: ".4rem" }}>
        Boklisten.no AS
        <CopyrightIcon />
        {moment().format("YYYY")}
      </Typography>
    </Card>
  );
}
