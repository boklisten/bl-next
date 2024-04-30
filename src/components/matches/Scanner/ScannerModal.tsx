import { Box, Button, Container, Modal } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import React, { useCallback } from "react";

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
  const handleScan = useCallback(handleSubmit, [handleSubmit]);

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
            options={{
              delayBetweenScanAttempts: 100,
              delayBetweenScanSuccess: 100,
              constraints: {
                facingMode: "environment",
              },
              hints: new Map<DecodeHintType, unknown>([
                [
                  DecodeHintType.POSSIBLE_FORMATS,
                  [
                    BarcodeFormat.QR_CODE,
                    BarcodeFormat.EAN_8,
                    BarcodeFormat.EAN_13,
                  ],
                ],
                [DecodeHintType.TRY_HARDER, true],
              ]),
            }}
            onResult={(text) => {
              navigator.vibrate(100);
              handleScan(text);
            }}
          />
        </Box>
      </Container>
    </Modal>
  );
};

export default ScannerModal;
