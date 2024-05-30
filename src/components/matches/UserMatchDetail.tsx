import { Alert, Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";

import {
  calculateFulfilledUserMatchCustomerItems,
  calculateItemStatuses,
  ItemStatus,
  MatchHeader,
} from "@/components/matches/matches-helper";
import { UserMatchTitle } from "@/components/matches/matchesList/helper";
import ProgressBar from "@/components/matches/matchesList/ProgressBar";
import MatchItemTable from "@/components/matches/MatchItemTable";
import MeetingInfo from "@/components/matches/MeetingInfo";
import OtherPersonContact from "@/components/matches/OtherPersonContact";
import Scanner from "@/components/matches/Scanner/Scanner";
import { UserMatchWithDetails } from "@/utils/types";

const UserMatchDetail = ({
  match,
  currentUserId,
}: {
  match: UserMatchWithDetails;
  currentUserId: string;
}) => {
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const isSender = match.sender === currentUserId;
  const fulfilledItems = calculateFulfilledUserMatchCustomerItems(
    match,
    isSender,
  );
  const otherPersonFulfilledItems = calculateFulfilledUserMatchCustomerItems(
    match,
    !isSender,
  );
  const isFulfilled = fulfilledItems.length >= match.expectedItems.length;

  let itemStatuses: ItemStatus[];
  try {
    itemStatuses = calculateItemStatuses(
      match,
      (match) => match.expectedItems,
      fulfilledItems,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return <Alert severity="error">En feil oppstod: {error?.message}</Alert>;
  }

  return (
    <>
      <Typography variant="h1">
        <UserMatchTitle match={match} isSender={isSender} />
      </Typography>

      {isFulfilled && (
        <Alert sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Du har {isSender ? "levert" : "mottatt"} alle bøkene for denne
          overleveringen.
        </Alert>
      )}
      {fulfilledItems.length !== otherPersonFulfilledItems.length &&
        isSender && (
          <Alert severity={"warning"} sx={{ marginBottom: "1rem" }}>
            Noen av de overleverte bøkene har vært på andres vegne. Ta kontakt
            med stand for mer informasjon.
          </Alert>
        )}

      <ProgressBar
        percentComplete={
          (fulfilledItems.length * 100) / match.expectedItems.length
        }
        subtitle={
          <>
            {fulfilledItems.length} av {match.expectedItems.length} bøker{" "}
            {isSender ? "levert" : "mottatt"}
          </>
        }
      />

      <Box>
        <Typography variant="h2">Hvordan fungerer det?</Typography>
        <Typography>
          Du skal møte en annen elev og utveksle bøker. Det er viktig at den som
          mottar bøker scanner hver bok, hvis ikke blir ikke bøkene registrert
          som levert, og avsender kan få faktura.
        </Typography>
      </Box>
      <MatchHeader>Du skal møte</MatchHeader>
      <MeetingInfo match={match} />
      <OtherPersonContact match={match} currentUserId={currentUserId} />

      {!isSender && !isFulfilled && (
        <>
          <MatchHeader>Når du skal motta bøkene</MatchHeader>
          <Scanner forceUpdate={forceUpdate} />
        </>
      )}

      <MatchHeader>
        Du skal {isSender ? "levere" : "motta"} disse bøkene
      </MatchHeader>
      <MatchItemTable itemStatuses={itemStatuses} isSender={isSender} />
    </>
  );
};

export default UserMatchDetail;
