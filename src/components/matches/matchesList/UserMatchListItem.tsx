import React from "react";
import { formatActionsString, matchBegun, matchFulfilled } from "./helper";
import MatchListItemBox from "./MatchListItemBox";
import { Alert, Typography } from "@mui/material";
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
  const deliveredCount = match.deliveredCustomerItems.length;
  const receivedCount = match.receivedCustomerItems.length;
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
              ((isSender ? deliveredCount : receivedCount) * 100) / numberItems
            }
            subtitle={
              <Box>
                {isSender ? "Levert" : "Mottatt"}{" "}
                {isSender ? deliveredCount : receivedCount} av {numberItems}{" "}
                bøker
                {isSender && deliveredCount !== receivedCount && (
                  <Alert severity={"warning"} sx={{ mt: "1rem" }}>
                    Noen av bøkene du har levert har vært på andres vegne. Ta
                    kontakt med stand for mer informasjon.
                  </Alert>
                )}
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
