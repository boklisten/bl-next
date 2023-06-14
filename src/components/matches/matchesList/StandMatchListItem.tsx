import { StandMatch } from "@boklisten/bl-model";
import { Box } from "@mui/material";
import React from "react";
import { formatActionsString, matchBegun, matchFulfilled } from "./helper";
import MatchListItemBox from "./MatchListItemBox";
import ProgressBar from "./ProgressBar";

const StandMatchListItem: React.FC<{
  match: StandMatch;
  currentUserId: string;
}> = ({ match }) => {
  const numberHandoffItems = match.expectedHandoffItems.length;
  const numberPickupItems = match.expectedPickupItems.length;
  const hasHandoffItems = numberHandoffItems > 0;
  const hasPickupItems = numberPickupItems > 0;
  const isBegun = matchBegun(match);
  const isFulfilled = matchFulfilled(match);
  return (
    <MatchListItemBox finished={isFulfilled} matchId={match.id}>
      {isBegun && (
        <>
          {hasHandoffItems && (
            <>
              <ProgressBar
                percentComplete={
                  (match.deliveredItems.length * 100) / numberHandoffItems
                }
                subtitle={
                  <Box>
                    Levert {match.deliveredItems.length} av {numberHandoffItems}{" "}
                    bøker
                  </Box>
                }
              />
            </>
          )}
          {hasPickupItems && (
            <>
              <ProgressBar
                percentComplete={
                  (match.receivedItems.length * 100) / numberPickupItems
                }
                subtitle={
                  <Box>
                    Mottatt {match.receivedItems.length} av {numberPickupItems}{" "}
                    bøker
                  </Box>
                }
              />
            </>
          )}
        </>
      )}
      {!isBegun && !isFulfilled && (
        <>
          <Box>
            {formatActionsString(numberHandoffItems, numberPickupItems)}
          </Box>
        </>
      )}
    </MatchListItemBox>
  );
};

export default StandMatchListItem;
