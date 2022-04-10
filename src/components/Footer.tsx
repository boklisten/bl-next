import ContactInfo from "./ContactInfo";
import { Card, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import CopyrightIcon from "@mui/icons-material/Copyright";
import moment from "moment";
import NextLink from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";

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
      <Box sx={{ marginBottom: ".2rem" }}>
        <NextLink href="/info/policies/conditions" passHref>
          <Link variant="body2" underline="none">
            Betingelser
          </Link>
        </NextLink>
        {" | "}
        <NextLink href="/info/policies/terms" passHref>
          <Link variant="body2" underline="none">
            Vilkår
          </Link>
        </NextLink>
        {" | "}
        <NextLink href="/info/policies/privacy" passHref>
          <Link variant="body2" underline="none">
            Personvernserklæring
          </Link>
        </NextLink>
      </Box>
      <Image
        width={200}
        height={72}
        src="/DIBS_shop_vertical_EN_10.png"
        alt="Dibs easy logo"
      />
      <Typography sx={{ marginTop: ".2rem" }}>
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
