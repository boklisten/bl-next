import { MatchWithDetails } from "@boklisten/bl-model";
import { Alert, Skeleton } from "@mui/material";
import React from "react";
import useSWR from "swr";

import BlFetcher from "@/api/blFetcher";
import { getAccessTokenBody } from "@/api/token";
import {
  isMatchFulfilled,
  isUserSenderInMatch,
} from "@/components/matches/matches-helper";
import { MatchListItemGroups } from "@/components/matches/matchesList/MatchListItemGroups";
import ProgressBar from "@/components/matches/matchesList/ProgressBar";
import BL_CONFIG from "@/utils/bl-config";

export const MatchesList: React.FC = () => {
  const { data: accessToken, error: tokenError } = useSWR("userId", () =>
    getAccessTokenBody(),
  );
  const userId = accessToken?.details;
  const { data: matches, error: matchesError } = useSWR(
    `${BL_CONFIG.collection.match}/me`,
    BlFetcher.get<MatchWithDetails[]>,
    { refreshInterval: 5000 },
  );

  if (!userId || tokenError || matchesError) {
    return <Alert severity="error">En feil har oppstått.</Alert>;
  }

  if (matches === undefined) {
    return <Skeleton />;
  }
  const sortedMatches = matches.sort((a, b) => {
    if (!a.meetingInfo.date) {
      return b.meetingInfo.date ? 1 : 0;
    } else if (!b.meetingInfo.date) {
      return -1;
    }

    if (a.meetingInfo.date > b.meetingInfo.date) return 1;
    if (a.meetingInfo.date < b.meetingInfo.date) return -1;

    return 0;
  });

  const unfulfilledMatches = sortedMatches.filter(
    (match) => !isMatchFulfilled(match, isUserSenderInMatch(match, userId)),
  );
  const fulfilledMatches = sortedMatches.filter((match) =>
    isMatchFulfilled(match, isUserSenderInMatch(match, userId)),
  );

  if (matches.length === 0) {
    return (
      <Alert severity="info">
        Du har ingen overleveringer :)
        <p>
          Har du fått melding om overleveringer? Sjekk om du er logget inn med
          riktig konto.
        </p>
        <p>Ta kontakt med info@boklisten.no om du har spørsmål.</p>
      </Alert>
    );
  }

  const numberFulfilledMatches = matches.filter((element) =>
    isMatchFulfilled(element, isUserSenderInMatch(element, userId)),
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

      {unfulfilledMatches.length > 0 && (
        <MatchListItemGroups matches={unfulfilledMatches} userId={userId} />
      )}

      {fulfilledMatches.length > 0 && (
        <MatchListItemGroups
          matches={fulfilledMatches}
          userId={userId}
          heading="Fullførte overleveringer"
        />
      )}
    </>
  );
};
