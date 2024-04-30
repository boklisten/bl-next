import { Box } from "@mui/material";
import React from "react";

import {
  calculateFulfilledStandMatchItems,
  isMatchBegun,
  isMatchFulfilled,
} from "@/components/matches/matches-helper";
import { formatActionsString } from "@/components/matches/matchesList/helper";
import MatchListItemBox from "@/components/matches/matchesList/MatchListItemBox";
import ProgressBar from "@/components/matches/matchesList/ProgressBar";
import { StandMatchWithDetails } from "@/utils/types";

const StandMatchListItem: React.FC<{
  match: StandMatchWithDetails;
  currentUserId: string;
}> = ({ match }) => {
  const numberHandoffItems = match.expectedHandoffItems.length;
  const numberPickupItems = match.expectedPickupItems.length;
  const hasHandoffItems = numberHandoffItems > 0;
  const hasPickupItems = numberPickupItems > 0;
  const { fulfilledPickupItems, fulfilledHandoffItems } =
    calculateFulfilledStandMatchItems(match);
  const isBegun = isMatchBegun(match, false);
  const isFulfilled = isMatchFulfilled(match, false);
  return (
    <MatchListItemBox finished={isFulfilled} matchId={match.id}>
      {isBegun && (
        <>
          {hasHandoffItems && (
            <>
              <ProgressBar
                percentComplete={
                  (fulfilledHandoffItems.length * 100) / numberHandoffItems
                }
                subtitle={
                  <Box>
                    Levert {fulfilledHandoffItems.length} av{" "}
                    {numberHandoffItems} bøker
                  </Box>
                }
              />
            </>
          )}
          {hasPickupItems && (
            <>
              <ProgressBar
                percentComplete={
                  (fulfilledPickupItems.length * 100) / numberPickupItems
                }
                subtitle={
                  <Box>
                    Mottatt {fulfilledPickupItems.length} av {numberPickupItems}{" "}
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
