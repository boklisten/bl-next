import React, { useRef, useState } from "react";
import { AlertColor, Button } from "@mui/material";
import { addWithEndpoint } from "../../../api/api";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { ScannedTextType, TextType } from "../../../utils/types";
import ScannerTutorial from "./ScannerTutorial";
import ScannerFeedback from "./ScannerFeedback";
import ScannerModal from "./ScannerModal";
import Box from "@mui/material/Box";

function determineScannedTextType(scannedText: string): ScannedTextType {
  if (Number.isNaN(Number(scannedText))) {
    if (scannedText.length === 12) {
      return TextType.BLID;
    }
  } else {
    if (scannedText.length === 8) {
      return TextType.BLID;
    } else if (scannedText.length === 13) {
      return TextType.ISBN;
    }
  }
  return TextType.UNKNOWN;
}

type Feedback = {
  text: string;
  severity: AlertColor;
  visible: boolean;
};

const Scanner = ({ forceUpdate }: { forceUpdate: () => void }) => {
  const [scanModalOpen, setScanModalOpen] = useState(false);
  /*
  const [manualRegistrationModalOpen, setManualRegistrationModalOpen] =
    useState(false);
   */

  const [feedback, setFeedback] = useState<Feedback>({
    text: "",
    severity: "success",
    visible: false,
  });
  const scannerLocked = useRef(false);

  const displayFeedback = (text: string, severity: AlertColor) => {
    setFeedback({ text, severity, visible: true });
  };

  const handleRegistration = async (scannedText: string): Promise<boolean> => {
    const scannedTextType = determineScannedTextType(scannedText);

    if (scannedTextType === TextType.ISBN) {
      displayFeedback(
        "Feil strekkode. Bruk bokas unike ID. Se instruksjoner for hjelp",
        "error"
      );
      return false;
    }

    if (scannedTextType === TextType.UNKNOWN) {
      displayFeedback(
        "Ugyldig strekkode. Vennligst prøv igjen, eller ta kontakt med stand for hjelp",
        "error"
      );
      return false;
    }

    if (scannerLocked.current) {
      return false;
    }
    scannerLocked.current = true;
    try {
      const response = await addWithEndpoint(
        "matches",
        "transfer-item",
        JSON.stringify({ blid: scannedText })
      );
      const feedback = response.data?.data?.[0]?.feedback;
      displayFeedback(
        feedback ?? "Boken har blitt registrert!",
        feedback ? "info" : "success"
      );
      // setManualRegistrationModalOpen(false);
      setScanModalOpen(false);
      return true;
    } catch (error) {
      displayFeedback(String(error), "error");
      return false;
    } finally {
      scannerLocked.current = false;
      // TODO: test with serveo, do we need forceUpdate?
      forceUpdate();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <ScannerTutorial />
      <ScannerFeedback
        open={feedback.visible}
        severity={feedback.severity}
        feedback={feedback.text}
        handleClose={() =>
          setFeedback((previous) => ({ ...previous, visible: false }))
        }
      />
      <Button
        sx={{ background: "green" }}
        startIcon={<QrCodeScannerIcon />}
        variant={"contained"}
        onClick={() => setScanModalOpen(true)}
      >
        Scan bøker
      </Button>
      {/**
         *
         <p>eller</p>
         <Button
         startIcon={<CreateIcon />}
         variant={"contained"}
         onClick={() => setManualRegistrationModalOpen(true)}
         >
         Manuell registrering
         </Button>
         <ManualRegistrationModal
         open={manualRegistrationModalOpen}
         handleClose={() => {
          setManualRegistrationModalOpen(false);
          setFeedbackVisible(false);
        }}
         handleSubmit={handleRegistration}
         />
         *
         */}
      <ScannerModal
        open={scanModalOpen}
        handleClose={() => {
          setScanModalOpen(false);
          setFeedback((previous) => ({ ...previous, visible: false }));
        }}
        handleSubmit={handleRegistration}
      />
    </Box>
  );
};

export default Scanner;
