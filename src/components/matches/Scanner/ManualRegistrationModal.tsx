import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ManualRegistrationModal = ({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (scannedText: string) => Promise<boolean>;
}) => {
  const [manualInput, setManualInput] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Modal open={open}>
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
        <Typography variant="h4">Manuell registrering</Typography>
        <InputLabel sx={{ mt: "1rem", mb: ".4rem" }}>
          Skriv inn bokas unike ID
        </InputLabel>
        <TextField
          value={manualInput}
          label="12345678 / a1b2c3d4e5f6"
          sx={{ marginBottom: "1rem" }}
          onChange={(event) => setManualInput(event.target.value)}
        />
        <Box sx={{ marginBottom: "1rem" }}>
          <Button
            sx={{ marginRight: "1rem" }}
            color={"error"}
            variant={"contained"}
            onClick={() => {
              setManualInput("");
              handleClose();
            }}
          >
            Lukk
          </Button>
          <LoadingButton
            loading={loading}
            variant={"contained"}
            onClick={async () => {
              setLoading(true);
              const success = await handleSubmit(manualInput);
              setLoading(false);
              if (success) {
                setManualInput("");
              }
            }}
          >
            Bekreft
          </LoadingButton>
        </Box>
      </Container>
    </Modal>
  );
};

export default ManualRegistrationModal;
