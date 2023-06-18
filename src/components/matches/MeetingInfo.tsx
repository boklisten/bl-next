import { Box, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { formatDatetime } from "./matchesList/helper";
import React from "react";
import { MatchWithDetails } from "@boklisten/bl-model";

const MeetingInfo = ({ match }: { match: MatchWithDetails }) => {
  const meetingTime = match.meetingInfo.date;
  const meetingLocation = match.meetingInfo.location;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
      <Typography fontWeight="bold" variant={"subtitle1"}>
        {meetingLocation}
      </Typography>
      <Box sx={{ display: "flex", marginTop: ".2rem", alignItems: "center" }}>
        <ScheduleIcon sx={{ marginRight: ".2rem" }} />
        {(meetingTime && (
          <>
            <Typography fontWeight="bold" variant={"subtitle1"}>
              {formatDatetime(new Date(meetingTime))}
            </Typography>
          </>
        )) || <>Du kan møte opp når som helst i løpet av dagen</>}
      </Box>
    </Box>
  );
};

export default MeetingInfo;
