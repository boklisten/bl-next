import useSWR from "swr";
import BL_CONFIG from "../../../utils/bl-config";
import React from "react";
import { apiFetcher } from "api/api";
import { getAccessTokenBody } from "../../../api/token";
import { groupMatchesByTimeAndLocation, matchFulfilled } from "./helper";
import { MatchVariant, StandMatch } from "@boklisten/bl-model";
import { MatchListItemGroups } from "./MatchListItemGroups";
import ProgressBar from "./ProgressBar";
import { Box } from "@mui/material";
import { UserMatchWithDetails } from "../../../utils/types";

export const MatchesList: React.FC = () => {
  const { data: accessToken, error: tokenError } = useSWR("userId", () =>
    getAccessTokenBody()
  );
  const userId = accessToken?.details;
  const { data: matches, error: matchesError } = useSWR(
    `${BL_CONFIG.collection.match}/me`,
    // The following line errors in WebStorm for some reason, but it's allowed.
    // WebStorm accepts it wrapped in parentheses, but then prettier doesn't, so
    // just ignore it.
    apiFetcher<MatchWithDetails[]>,
    { refreshInterval: 5000 }
  );

  if (tokenError || matchesError) {
    return <Box>En feil har oppstått.</Box>;
  }

  if (matches === undefined) {
    return <Box>Laster</Box>;
  }

  const standMatches = matches
    .filter((match) => match._variant === MatchVariant.StandMatch)
    .map((standMatch) => standMatch as StandMatch)
    .sort((a, b) => (matchFulfilled(a) ? 1 : matchFulfilled(b) ? -1 : 0));
  const userMatches = matches
    .filter((match) => match._variant === MatchVariant.UserMatch)
    .map((userMatch) => userMatch as UserMatchWithDetails)
    .sort((a, b) => (matchFulfilled(a) ? 1 : matchFulfilled(b) ? -1 : 0));
  const standMatchesByTime = groupMatchesByTimeAndLocation(standMatches);
  const userMatchesByTime = groupMatchesByTimeAndLocation(userMatches);

  if (matches.length === 0) {
    return <Box>Du har ingen overleveringer :)</Box>;
  }

  const numberFulfilledMatches = matches.filter((element) =>
    matchFulfilled(element)
  ).length;
  return (
    <>
      <ProgressBar
        percentComplete={(numberFulfilledMatches * 100) / matches.length}
        subtitle={
          <span>
            Fullført {numberFulfilledMatches} av {matches.length} overleveringer
          </span>
        }
      />

      {userMatches.length > 0 && (
        <MatchListItemGroups
          groups={userMatchesByTime}
          userId={userId!}
          heading="Bytte med elever"
        />
      )}

      {standMatches.length > 0 && (
        <MatchListItemGroups
          groups={standMatchesByTime}
          userId={userId!}
          heading="Stand"
        />
      )}
    </>
  );
};
