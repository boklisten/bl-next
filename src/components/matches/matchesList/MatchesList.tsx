import useSWR from "swr";
import BL_CONFIG from "../../../utils/bl-config";
import React from "react";
import { apiFetcher } from "api/api";
import { getAccessTokenBody } from "../../../api/token";
import { groupMatchesByTimeAndLocation } from "./helper";
import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { MatchListItemGroups } from "./MatchListItemGroups";
import ProgressBar from "./ProgressBar";
import { Alert, Skeleton } from "@mui/material";
import {
  StandMatchWithDetails,
  UserMatchWithDetails,
} from "../../../utils/types";
import { isMatchFulfilled, isUserSenderInMatch } from "../matches-helper";

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

  if (!userId || tokenError || matchesError) {
    return <Alert severity="error">En feil har oppstått.</Alert>;
  }

  if (matches === undefined) {
    return <Skeleton />;
  }

  const standMatches = matches
    .filter((match) => match._variant === MatchVariant.StandMatch)
    .map((standMatch) => standMatch as StandMatchWithDetails)
    .sort((a, b) =>
      isMatchFulfilled(a, false) ? 1 : isMatchFulfilled(b, false) ? -1 : 0
    );
  const userMatches = matches
    .filter((match) => match._variant === MatchVariant.UserMatch)
    .map((userMatch) => userMatch as UserMatchWithDetails)
    .sort((a, b) =>
      isMatchFulfilled(a, isUserSenderInMatch(a, userId))
        ? 1
        : isMatchFulfilled(b, isUserSenderInMatch(b, userId))
        ? -1
        : 0
    );
  const standMatchesByTime = groupMatchesByTimeAndLocation(standMatches);
  const userMatchesByTime = groupMatchesByTimeAndLocation(userMatches);

  if (matches.length === 0) {
    return <Alert severity="info">Du har ingen overleveringer :)</Alert>;
  }

  const numberFulfilledMatches = matches.filter((element) =>
    isMatchFulfilled(element, isUserSenderInMatch(element, userId))
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