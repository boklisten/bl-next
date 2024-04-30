import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Box, Typography } from "@mui/material";
import React from "react";

import DynamicLink from "@/components/DynamicLink";
import ContactInfo from "@/components/info/ContactInfo";

const OtherPersonContact = ({
  match,
  currentUserId,
}: {
  match: MatchWithDetails;
  currentUserId: string;
}) => {
  if (match._variant === MatchVariant.StandMatch) {
    return <ContactInfo />;
  }
  const otherPerson =
    match.receiver === currentUserId
      ? match.senderDetails
      : match.receiverDetails;

  return (
    <Box
      key={otherPerson.phone}
      sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}
    >
      <PhoneIphoneIcon sx={{ marginRight: ".2rem" }} />
      <Box>
        <Typography>{otherPerson.name}</Typography>

        <DynamicLink href={`tel:+47${otherPerson.phone}`}>
          {otherPerson.phone}
        </DynamicLink>
      </Box>
    </Box>
  );
};

export default OtherPersonContact;
