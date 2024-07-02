"use client";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import DynamicLink from "@/components/DynamicLink";
import { contactInfo } from "@/utils/constants";

const ContactInfo = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <PhoneIphoneIcon />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="body1">Ring oss</Typography>
          <DynamicLink href={`tel:+${contactInfo.phone}`}>
            {contactInfo.phone}
          </DynamicLink>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <EmailIcon />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="body1">Send oss en epost</Typography>
          <DynamicLink href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </DynamicLink>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <LocationOnIcon />
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="body1" data-testid="contact-address">
            Vår adresse
          </Typography>
          {contactInfo.address}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;
