import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import CountdownToRedirect from "@/components/CountdownToRedirect";
import {
  calculateFulfilledUserMatchItems,
  calculateItemStatuses,
  ItemStatus,
  MatchHeader,
} from "@/components/matches/matches-helper";
import { UserMatchTitle } from "@/components/matches/matchesList/helper";
import ProgressBar from "@/components/matches/matchesList/ProgressBar";
import MatchItemTable from "@/components/matches/MatchItemTable";
import MeetingInfo from "@/components/matches/MeetingInfo";
import OtherPersonContact from "@/components/matches/OtherPersonContact";
import ScannerModal from "@/components/matches/Scanner/ScannerModal";
import ScannerTutorial from "@/components/matches/Scanner/ScannerTutorial";
import { UserMatchWithDetails } from "@/utils/types";

const UserMatchDetail = ({
  match,
  currentUserId,
  handleItemTransferred,
}: {
  match: UserMatchWithDetails;
  currentUserId: string;
  handleItemTransferred?: (() => void) | undefined;
}) => {
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [redirectCountdownStarted, setRedirectCountdownStarted] =
    useState(false);
  const isSender = match.sender === currentUserId;
  const fulfilledItems = calculateFulfilledUserMatchItems(match, isSender);
  const otherPersonFulfilledItems = calculateFulfilledUserMatchItems(
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
        <Box my={"1rem"}>
          <Alert>
            Du har {isSender ? "levert" : "mottatt"} alle bøkene for denne
            overleveringen.
          </Alert>
          {redirectCountdownStarted && (
            <CountdownToRedirect path={"/matches"} seconds={5} />
          )}
        </Box>
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

      {isSender &&
        otherPersonFulfilledItems.some(
          (item) => !fulfilledItems.includes(item),
        ) && (
          <Alert severity={"warning"} sx={{ my: "1rem" }}>
            Noen av bøkene du har levert tilhørte en annen elev. Du er selv
            ansvarlig for at bøkene du opprinnelig fikk utdelt blir levert. Hvis
            noen andre leverer bøkene dine, eller vi finner dem når skapene
            tømmes, vil de bli markert som levert.
          </Alert>
        )}

      {!isFulfilled && (
        <>
          <Box sx={{ my: "1rem" }}>
            <Typography variant="h2">Hvordan fungerer det?</Typography>
            <Typography>
              Du skal møte en annen elev og utveksle bøker. Det er viktig at den
              som mottar bøker scanner hver bok, hvis ikke blir ikke bøkene
              registrert som levert, og avsender kan få faktura.
            </Typography>
          </Box>
          <MatchHeader>Du skal møte</MatchHeader>
          <MeetingInfo match={match} />
          <OtherPersonContact match={match} currentUserId={currentUserId} />
        </>
      )}

      {!isSender && !isFulfilled && (
        <>
          <MatchHeader>Når du skal motta bøkene</MatchHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <ScannerTutorial />
            <Button
              sx={{ background: "green" }}
              startIcon={<QrCodeScannerIcon />}
              variant={"contained"}
              onClick={() => setScanModalOpen(true)}
            >
              Scan bøker
            </Button>
          </Box>
        </>
      )}

      {!isFulfilled && (
        <MatchHeader>
          Du skal {isSender ? "levere" : "motta"} disse bøkene
        </MatchHeader>
      )}
      <MatchItemTable itemStatuses={itemStatuses} isSender={isSender} />

      <ScannerModal
        open={scanModalOpen}
        handleItemTransferred={handleItemTransferred}
        handleClose={() => {
          setScanModalOpen(false);
          setRedirectCountdownStarted(isFulfilled);
        }}
        itemStatuses={itemStatuses}
        expectedItems={match.expectedItems}
        fulfilledItems={fulfilledItems}
      />
    </>
  );
};

export default UserMatchDetail;
