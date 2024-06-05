import { Box, Button, Container, Modal } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import React from "react";

const ScannerModal = ({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (scannedText: string) => Promise<boolean>;
}) => {
  console.log("scannermodal");
  return (
    <Modal open={open}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Button
          color={"info"}
          sx={{ position: "absolute", top: 80, zIndex: 100 }}
          variant={"contained"}
          onClick={handleClose}
        >
          Lukk
        </Button>
        <Box sx={{ position: "absolute", width: "100%" }}>
          <Scanner
            constraints={{ facingMode: "environment" }}
            formats={["qr_code", "code_128", "ean_8", "ean_13"]}
            components={{ torch: true }}
            onScan={(detectedCodes) => {
              for (const code of detectedCodes) {
                handleSubmit(code.rawValue);
              }
            }}
          />
        </Box>
      </Container>
    </Modal>
  );
};

export default ScannerModal;
