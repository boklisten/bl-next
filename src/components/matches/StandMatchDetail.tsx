import { Alert } from "@mui/material";
import React from "react";
import { StandMatchWithDetails } from "../../utils/types";
import {
  calculateItemStatuses,
  ItemStatus,
  MatchHeader,
} from "./matches-helper";
import ProgressBar from "./matchesList/ProgressBar";
import MeetingInfo from "./MeetingInfo";
import MatchItemTable from "./MatchItemTable";
import OtherPersonContact from "./OtherPersonContact";

const StandMatchDetail = ({
  match,
  currentUserId,
}: {
  match: StandMatchWithDetails;
  currentUserId: string;
}) => {
  const fulfilledHandoffItems = match.expectedHandoffItems.filter((item) =>
    match.deliveredItems.includes(item)
  );
  const fulfilledPickupItems = match.expectedPickupItems.filter((item) =>
    match.receivedItems.includes(item)
  );
  const isFulfilled =
    fulfilledHandoffItems.length >= match.expectedHandoffItems.length &&
    fulfilledPickupItems.length >= match.expectedPickupItems.length;

  let handoffItemStatuses: ItemStatus[];
  let pickupItemStatuses: ItemStatus[];
  try {
    handoffItemStatuses = calculateItemStatuses(
      match,
      (match) => match.expectedHandoffItems,
      fulfilledHandoffItems
    );
    pickupItemStatuses = calculateItemStatuses(
      match,
      (match) => match.expectedPickupItems,
      fulfilledPickupItems
    );
  } catch (error: any) {
    return <Alert severity="error">En feil oppstod: {error?.message}</Alert>;
  }

  const hasHandoffItems = match.expectedHandoffItems.length > 0;
  const hasPickupItems = match.expectedPickupItems.length > 0;

  return (
    <>
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

      <MatchHeader>Du skal på stand ved</MatchHeader>
      <MeetingInfo match={match} />

      <MatchHeader>Kontaktinformasjon</MatchHeader>
      <OtherPersonContact match={match} currentUserId={currentUserId} />
    </>
  );
};

export default StandMatchDetail;
