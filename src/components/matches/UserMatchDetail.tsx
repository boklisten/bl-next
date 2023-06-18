import { Alert } from "@mui/material";
import React, { useCallback, useState } from "react";
import { UserMatchWithDetails } from "../../utils/types";
import {
  calculateFulfilledUserMatchCustomerItems,
  calculateItemStatuses,
  ItemStatus,
  MatchHeader,
} from "./matches-helper";
import ProgressBar from "./matchesList/ProgressBar";
import MeetingInfo from "./MeetingInfo";
import MatchItemTable from "./MatchItemTable";
import OtherPersonContact from "./OtherPersonContact";
import Scanner from "./Scanner/Scanner";

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
    isSender
  );
  const otherPersonFulfilledItems = calculateFulfilledUserMatchCustomerItems(
    match,
    !isSender
  );
  const isFulfilled = fulfilledItems.length >= match.expectedItems.length;

  let itemStatuses: ItemStatus[];
  try {
    itemStatuses = calculateItemStatuses(
      match,
      (match) => match.expectedItems,
      fulfilledItems
    );
  } catch (error: any) {
    return <Alert severity="error">En feil oppstod: {error?.message}</Alert>;
  }

  return (
    <>
      {isFulfilled && (
        <Alert sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          Du har {isSender ? "levert" : "mottatt"} alle bøkene for denne
          overleveringen.
        </Alert>
      )}
      {fulfilledItems.length !== otherPersonFulfilledItems.length &&
        isSender && (
          <Alert severity={"warning"} sx={{ mt: "1rem" }}>
            Noen av bøkene du har levert har vært på andres vegne. Ta kontakt
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

      {!isSender && !isFulfilled && (
        <>
          <MatchHeader>Når du skal motta bøkene</MatchHeader>
          <Scanner forceUpdate={forceUpdate} />
        </>
      )}

      <MatchHeader>Du skal møte</MatchHeader>
      <OtherPersonContact match={match} currentUserId={currentUserId} />
      <MeetingInfo match={match} />

      <MatchHeader>
        Du skal {isSender ? "levere" : "motta"} disse bøkene
      </MatchHeader>
      <MatchItemTable itemStatuses={itemStatuses} isSender={isSender} />
    </>
  );
};

export default UserMatchDetail;
