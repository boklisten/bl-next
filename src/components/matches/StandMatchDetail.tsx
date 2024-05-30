import { Alert, Typography } from "@mui/material";
import React from "react";

import {
  calculateFulfilledStandMatchItems,
  calculateItemStatuses,
  ItemStatus,
  MatchHeader,
} from "@/components/matches/matches-helper";
import { StandMatchTitle } from "@/components/matches/matchesList/helper";
import ProgressBar from "@/components/matches/matchesList/ProgressBar";
import MatchItemTable from "@/components/matches/MatchItemTable";
import MeetingInfo from "@/components/matches/MeetingInfo";
import OtherPersonContact from "@/components/matches/OtherPersonContact";
import { StandMatchWithDetails } from "@/utils/types";

const StandMatchDetail = ({
  match,
  currentUserId,
}: {
  match: StandMatchWithDetails;
  currentUserId: string;
}) => {
  const { fulfilledHandoffItems, fulfilledPickupItems } =
    calculateFulfilledStandMatchItems(match);
  const isFulfilled =
    fulfilledHandoffItems.length >= match.expectedHandoffItems.length &&
    fulfilledPickupItems.length >= match.expectedPickupItems.length;

  let handoffItemStatuses: ItemStatus[];
  let pickupItemStatuses: ItemStatus[];
  try {
    handoffItemStatuses = calculateItemStatuses(
      match,
      (match) => match.expectedHandoffItems,
      fulfilledHandoffItems,
    );
    pickupItemStatuses = calculateItemStatuses(
      match,
      (match) => match.expectedPickupItems,
      fulfilledPickupItems,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return <Alert severity="error">En feil oppstod: {error?.message}</Alert>;
  }

  const hasHandoffItems = match.expectedHandoffItems.length > 0;
  const hasPickupItems = match.expectedPickupItems.length > 0;

  return (
    <>
      <Typography variant="h1">
        <StandMatchTitle match={match} />
      </Typography>

      {isFulfilled && (
        <Alert sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Du har mottatt og levert alle bøkene for denne overleveringen.
        </Alert>
      )}

      {hasHandoffItems && (
        <ProgressBar
          percentComplete={
            (fulfilledHandoffItems.length * 100) /
            match.expectedHandoffItems.length
          }
          subtitle={
            <>
              {fulfilledHandoffItems.length} av{" "}
              {match.expectedHandoffItems.length} bøker levert
            </>
          }
        />
      )}

      {hasPickupItems && (
        <ProgressBar
          percentComplete={
            (fulfilledPickupItems.length * 100) /
            match.expectedPickupItems.length
          }
          subtitle={
            <>
              {fulfilledPickupItems.length} av{" "}
              {match.expectedPickupItems.length} bøker mottatt
            </>
          }
        />
      )}

      {hasHandoffItems && (
        <>
          <MatchHeader>Disse bøkene skal leveres inn</MatchHeader>
          <MatchItemTable itemStatuses={handoffItemStatuses} isSender={true} />
        </>
      )}

      {hasPickupItems && (
        <>
          <MatchHeader>Disse bøkene skal hentes</MatchHeader>
          <MatchItemTable itemStatuses={pickupItemStatuses} isSender={false} />
        </>
      )}

      <MatchHeader>Du skal på stand:</MatchHeader>
      <MeetingInfo match={match} />

      <MatchHeader>Kontaktinformasjon</MatchHeader>
      <OtherPersonContact match={match} currentUserId={currentUserId} />
    </>
  );
};

export default StandMatchDetail;
