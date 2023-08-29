import { Box, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { formatDatetime } from "./matchesList/helper";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { MatchWithDetails } from "@boklisten/bl-model";
import DynamicLink from "../DynamicLink";

const MeetingInfo = ({ match }: { match: MatchWithDetails }) => {
  const meetingTime = match.meetingInfo.date;
  const meetingLocation = match.meetingInfo.location;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
      <Box sx={{ display: "flex", marginTop: ".2rem", alignItems: "center" }}>
        <PlaceIcon sx={{ marginRight: ".2rem" }} />
        <Typography fontWeight="bold" variant={"subtitle1"}>
          {meetingLocation}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", marginTop: ".2rem", alignItems: "center" }}>
        <ScheduleIcon sx={{ marginRight: ".2rem" }} />
        {(meetingTime && (
          <>
            <Typography fontWeight="bold" variant={"subtitle1"}>
              {formatDatetime(new Date(meetingTime))}
            </Typography>
          </>
        )) || (
          <>
            <Typography sx={{ whiteSpace: "pre" }}>
              Du kan møte opp når som helst i{" "}
              <DynamicLink variant="body1" href="/info/branch/select">
                skolens åpningstider
              </DynamicLink>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MeetingInfo;
