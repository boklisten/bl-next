import React from "react";
import { Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import NextLink from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { contactInfo } from "../constants";

const ContactInfo = () => {
  return (
    <Box
      data-testid="contact-info"
      sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <PhoneIphoneIcon />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="body1">Ring oss</Typography>
          <NextLink href={`tel:+${contactInfo.phone}`} passHref>
            <Link variant="body2" underline="none">
              {contactInfo.phone}
            </Link>
          </NextLink>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <EmailIcon />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="body1">Send oss en epost</Typography>
          <NextLink href={`mailto:${contactInfo.email}`} passHref>
            <Link variant="body2" underline="none">
              {contactInfo.email}
            </Link>
          </NextLink>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <LocationOnIcon />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="body1">Vår adresse</Typography>
          {contactInfo.address}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;
