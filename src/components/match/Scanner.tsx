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

const Scanner = () => {
  const [result, setResult] = useState<string>("");
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const myConstraints = {};

  const handleOpenManualInput = () => {
    setManualInput("");
    setManualModalOpen(!scanModalOpen);
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
      <ScannerFeedback open={result.length > 0} />

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
            value={manualInput}
            label="unik ID"
            sx={{ marginTop: "2rem", marginBottom: "1rem" }}
            onChange={(event) => setManualInput(event.target.value)}
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
              onClick={() => setResult(manualInput)}
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
              }
              setTimeout(() => {});
            }}
            containerStyle={{ width: "100%" }}
            constraints={myConstraints}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Scanner;
