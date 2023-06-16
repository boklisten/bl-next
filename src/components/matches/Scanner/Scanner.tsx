import React, { useState } from "react";
import { AlertColor, Button } from "@mui/material";
import { addWithEndpoint } from "../../../api/api";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CreateIcon from "@mui/icons-material/Create";
import { ScannedTextType, TextType } from "../../../utils/types";
import ScannerTutorial from "./ScannerTutorial";
import ScannerFeedback from "./ScannerFeedback";
import ManualRegistrationModal from "./ManualRegistrationModal";
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

const Scanner = ({ forceUpdate }: { forceUpdate: () => void }) => {
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [manualRegistrationModalOpen, setManualRegistrationModalOpen] =
    useState(false);

  const [feedback, setFeedback] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] =
    useState<AlertColor>("success");
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const displayFeedback = (feedback: string, severity: AlertColor) => {
    setFeedback(feedback);
    setFeedbackSeverity(severity);
    setFeedbackVisible(true);
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
      setManualRegistrationModalOpen(false);
      setScanModalOpen(false);
      return true;
    } catch (error) {
      displayFeedback(String(error), "error");
      return false;
    } finally {
      // TODO: test with serveo, do we need forceUpdate?
      forceUpdate();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ScannerTutorial />
      <ScannerFeedback
        open={feedbackVisible}
        severity={feedbackSeverity}
        feedback={feedback}
        handleClose={() => setFeedbackVisible(false)}
      />
      <Button
        startIcon={<QrCodeScannerIcon />}
        variant={"contained"}
        onClick={() => setScanModalOpen(true)}
      >
        Scan bøker
      </Button>
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
      <ScannerModal
        open={scanModalOpen}
        handleClose={() => {
          setScanModalOpen(false);
          setFeedbackVisible(false);
        }}
        handleSubmit={handleRegistration}
      />
    </Box>
  );
};

export default Scanner;
