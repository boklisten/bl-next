import { Close, InputRounded } from "@mui/icons-material";
import { AlertColor, Box, Button, Card, Modal, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Scanner } from "@yudiel/react-qr-scanner";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

import { addWithEndpoint } from "@/api/api";
import { ItemStatus } from "@/components/matches/matches-helper";
import ProgressBar from "@/components/matches/matchesList/ProgressBar";
import MatchItemTable from "@/components/matches/MatchItemTable";
import ManualRegistrationModal from "@/components/matches/Scanner/ManualRegistrationModal";
import ScannerFeedback from "@/components/matches/Scanner/ScannerFeedback";
import { ScannedTextType, TextType } from "@/utils/types";

function determineScannedTextType(scannedText: string): ScannedTextType {
  if (/^[\dA-Za-z]{12}$|^\d{8}$/.test(scannedText)) {
    return TextType.BLID;
  } else if (/^\d{13}$/.test(scannedText)) {
    return TextType.ISBN;
  }

  return TextType.UNKNOWN;
}

type Feedback = {
  text: string;
  severity: AlertColor;
  visible: boolean;
};

const ScannerModal = ({
  open,
  handleClose,
  handleItemTransferred,
  itemStatuses,
  expectedItems,
  fulfilledItems,
}: {
  open: boolean;
  handleClose: () => void;
  handleItemTransferred?: (() => void) | undefined;
  itemStatuses: ItemStatus[];
  expectedItems: string[];
  fulfilledItems: string[];
}) => {
  const [manualRegistrationModalOpen, setManualRegistrationModalOpen] =
    useState(false);

  const [feedback, setFeedback] = useState<Feedback>({
    text: "",
    severity: "success",
    visible: false,
  });

  const handleRegistration = async (scannedText: string) => {
    const scannedTextType = determineScannedTextType(scannedText);
    if (scannedTextType === TextType.ISBN) {
      setFeedback({
        text: "Feil strekkode. Bruk bokas unike ID. Se instruksjoner for hjelp",
        severity: "error",
        visible: true,
      });
      return;
    }
    if (scannedTextType === TextType.UNKNOWN) {
      setFeedback({
        text: "Ugyldig strekkode. Vennligst prøv igjen, eller ta kontakt med stand for hjelp",
        severity: "error",
        visible: true,
      });
      return;
    }

    try {
      const response: AxiosResponse<null | {
        data: { feedback: string }[];
      }> = await addWithEndpoint(
        "matches",
        "transfer-item",
        JSON.stringify({ blid: scannedText }),
      );
      try {
        navigator?.vibrate(100);
      } catch {
        // Some browsers or devices may not have implemented the vibrate function
      }
      const feedback = response.data?.data[0]?.feedback;
      setFeedback({
        text: feedback ?? "Boken har blitt registrert!",
        severity: feedback ? "info" : "success",
        visible: true,
      });
      try {
        handleItemTransferred?.();
      } catch (error: unknown) {
        // Do not expose potentially rough API errors to user
        console.error("Got error when handling item transferred", error);
      }
    } catch (error) {
      setFeedback({
        text: String(error),
        severity: "error",
        visible: true,
      });
    }
  };

  useEffect(() => {
    if (open && expectedItems.length === fulfilledItems.length) {
      handleClose();
    }
  }, [expectedItems.length, fulfilledItems.length, handleClose, open]);

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flexBasis: "30rem",
          maxWidth: "50rem",
          maxHeight: "calc(var(--vh, 1vh) * 100)",
          paddingBottom: "1rem",
          borderRadius: 0,
          overflowY: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: "30rem",
            maxHeight: "100%",
            flexBasis: "21rem",
            flexShrink: 0,
          }}
        >
          <Scanner
            constraints={{ facingMode: "environment" }}
            formats={["qr_code", "code_128", "ean_8", "ean_13"]}
            components={{ torch: true }}
            onScan={async (detectedCodes) => {
              for (const code of detectedCodes) {
                await handleRegistration(code.rawValue).catch((error) =>
                  console.error("Failed to handle scan", error),
                );
                // Arbitrary delay to somewhat avoid races the backend isn't smart enough to handle
                await new Promise((resolve) => {
                  window.setTimeout(resolve, 250);
                });
              }
            }}
          />
        </Box>
        <Box width={"90%"}>
          <ProgressBar
            percentComplete={
              (fulfilledItems.length * 100) / expectedItems.length
            }
            subtitle={
              <Typography textAlign={"center"}>
                {fulfilledItems.length} av {expectedItems.length} bøker mottatt
              </Typography>
            }
          />
        </Box>
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: "30rem",
            mt: "1rem",
          }}
        >
          <MatchItemTable itemStatuses={itemStatuses} isSender={false} />
        </Box>
        <Stack direction={"row"} gap={1} mt={"1rem"}>
          <Button
            color={"info"}
            variant={"outlined"}
            startIcon={<InputRounded />}
            onClick={() => setManualRegistrationModalOpen(true)}
          >
            Manuell registrering
          </Button>
          <Button
            color={"info"}
            startIcon={<Close />}
            variant={"contained"}
            onClick={handleClose}
          >
            Lukk
          </Button>
        </Stack>
        <ManualRegistrationModal
          open={manualRegistrationModalOpen}
          handleClose={() => {
            setManualRegistrationModalOpen(false);
          }}
          handleSubmit={(scannedText) => {
            setManualRegistrationModalOpen(false);
            handleRegistration(scannedText);
          }}
        />
        <ScannerFeedback
          open={feedback.visible}
          severity={feedback.severity}
          feedback={feedback.text}
          handleClose={() =>
            setFeedback((previous) => ({ ...previous, visible: false }))
          }
        />
      </Card>
    </Modal>
  );
};

export default ScannerModal;
