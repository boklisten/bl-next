import CropFreeIcon from "@mui/icons-material/CropFree";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React, { useCallback } from "react";

import BarcodeQrScanner from "@/components/matches/BarcodeQrScanner";

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
        <Typography variant={"h4"} sx={{ zIndex: 100 }}>
          Unik ID
        </Typography>
        <CropFreeIcon sx={{ zIndex: 100, fontSize: "200px" }} />
        <Button
          color={"info"}
          sx={{ position: "absolute", top: 80, zIndex: 100 }}
          variant={"contained"}
          onClick={handleClose}
        >
          Lukk
        </Button>
        <Box sx={{ position: "absolute" }}>
          <BarcodeQrScanner handleScan={handleScan} />
        </Box>
      </Container>
    </Modal>
  );
};

export default ScannerModal;
