import React from "react";
import { formatActionsString, matchBegun, matchFulfilled } from "./helper";
import MatchListItemBox from "./MatchListItemBox";
import { Typography } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import ProgressBar from "./ProgressBar";
import { Box } from "@mui/material";
import { UserMatchWithDetails } from "../../../utils/types";

const me = <span style={{ color: "#757575", fontWeight: 400 }}>Meg</span>;

const UserMatchListItem: React.FC<{
  match: UserMatchWithDetails;
  currentUserId: string;
}> = ({ match, currentUserId }) => {
  const numberItems = match.expectedItems.length;
  const isBegun = matchBegun(match);
  const isFulfilled = matchFulfilled(match);
  const isSender = match.sender === currentUserId;
  const HeaderLevel = "h4";
  return (
    <MatchListItemBox finished={isFulfilled} matchId={match.id}>
      {isSender ? (
        <Typography variant="cardHeader" component={HeaderLevel}>
          {me}{" "}
          <KeyboardDoubleArrowRight
            sx={{ verticalAlign: "text-bottom", fontSize: "1.3rem" }}
          />{" "}
          {match.receiverDetails.name}
        </Typography>
      ) : (
        <Typography variant="cardHeader" component={HeaderLevel}>
          {match.senderDetails.name}{" "}
          <KeyboardDoubleArrowRight
            sx={{ verticalAlign: "text-bottom", fontSize: "1.3rem" }}
          />{" "}
          {me}
        </Typography>
      )}

      {isBegun && (
        <>
          <ProgressBar
            percentComplete={
              (match.receivedCustomerItems.length * 100) / numberItems
            }
            subtitle={
              <Box>
                {isSender ? "Levert" : "Mottatt"}{" "}
                {match.receivedCustomerItems.length} av {numberItems} bøker
              </Box>
            }
          />
        </>
      )}
      {!isBegun && !isFulfilled && (
        <>
          <Box>
            {formatActionsString(
              isSender ? numberItems : 0,
              isSender ? 0 : numberItems
            )}
          </Box>
        </>
      )}
    </MatchListItemBox>
  );
};

export default UserMatchListItem;
