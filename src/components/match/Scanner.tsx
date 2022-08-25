import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import {
  Alert,
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Match } from "@boklisten/bl-model";
import { add } from "../../api/api";
import { useRouter } from "next/router";

const ScannerFeedback = ({ open }: { open: boolean }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity={"success"}>Boken ble scannet!</Alert>
    </Snackbar>
  );
};

const Scanner = ({ match }: { match: Match }) => {
  const [result, setResult] = useState<string>("");
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleOpenManualInput = () => {
    setResult("");
    setManualModalOpen(!scanModalOpen);
  };

  const handleBookScan = async (scannedBlid: string) => {
    match.events.push({
      type: "items-sent",
      time: new Date(),
      // @ts-ignore
      blid: scannedBlid,
    });
    try {
      await add("matches", match);
      setSuccess(true);
      router.reload();
    } catch {
      router.reload();
    }
  };

  return (
    <>
      <Button
        sx={{ marginTop: "1rem" }}
        variant={"contained"}
        onClick={() => setScanModalOpen(!scanModalOpen)}
      >
        Scan bøker
      </Button>
      <p>eller</p>
      <Button variant={"contained"} onClick={handleOpenManualInput}>
        Skriv inn unik ID manuelt
      </Button>
      <ScannerFeedback open={success} />

      <Modal open={manualModalOpen}>
        <Container
          component={Paper}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "4rem",
          }}
        >
          <Typography variant="h4">Skriv inn bokas unike ID</Typography>
          <TextField
            value={result}
            label="unik ID"
            sx={{ marginTop: "2rem", marginBottom: "1rem" }}
            onChange={(event) => setResult(event.target.value)}
          />
          <Box sx={{ marginBottom: "1rem" }}>
            <Button
              sx={{ marginRight: "1rem" }}
              color={"error"}
              variant={"contained"}
              onClick={() => setManualModalOpen(!manualModalOpen)}
            >
              Lukk
            </Button>
            <Button
              variant={"contained"}
              onClick={() => handleBookScan(result)}
            >
              Lever
            </Button>
          </Box>
        </Container>
      </Modal>

      <Modal open={scanModalOpen}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Button
            color={"error"}
            sx={{ position: "absolute", top: 80, zIndex: 100 }}
            variant={"contained"}
            onClick={() => setScanModalOpen(!scanModalOpen)}
          >
            Lukk
          </Button>
          <QrReader
            onResult={(result) => {
              if (result) {
                setResult(result.getText());
                handleBookScan(result.getText());
              }
              setTimeout(() => {});
            }}
            containerStyle={{ width: "100%" }}
            constraints={{ facingMode: "environment" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Scanner;
