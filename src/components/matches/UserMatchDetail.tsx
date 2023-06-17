import { Alert } from "@mui/material";
import React, { useCallback, useState } from "react";
import Scanner from "./Scanner";
import { UserMatchWithDetails } from "../../utils/types";
import {
  calculateItemStatuses,
  ItemStatus,
  MatchHeader,
} from "./matches-helper";
import ProgressBar from "./matchesList/ProgressBar";
import MeetingInfo from "./MeetingInfo";
import MatchItemTable from "./MatchItemTable";
import OtherPersonContact from "./OtherPersonContact";

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
  const fulfilledItems = match.expectedItems.filter((item) =>
    (isSender
      ? match.deliveredCustomerItems
      : match.receivedCustomerItems
    ).some((customerItem) => match.customerItemToItemMap[customerItem] === item)
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

      <MatchHeader>Du skal til</MatchHeader>
      <MeetingInfo match={match} />

      <MatchHeader>Du skal møte</MatchHeader>
      <OtherPersonContact match={match} currentUserId={currentUserId} />

      <MatchHeader>
        Du skal {isSender ? "levere" : "motta"} disse bøkene
      </MatchHeader>
      <MatchItemTable itemStatuses={itemStatuses} isSender={isSender} />

      {!isSender && !isFulfilled && (
        <>
          <MatchHeader>Når du skal motta bøkene</MatchHeader>
          <Scanner match={match} forceUpdate={forceUpdate} />
        </>
      )}
    </>
  );
};

export default UserMatchDetail;
