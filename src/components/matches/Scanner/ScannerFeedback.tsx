import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

const ScannerFeedback = ({
  feedback,
  severity,
  open,
  handleClose,
}: {
  feedback: string;
  severity: AlertColor;
  open: boolean;
  handleClose: () => void;
}) => {
  const autoClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    handleClose();
  };

  return (
    <Snackbar
      open={open}
      onClose={autoClose}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity={severity}>{feedback}</Alert>
    </Snackbar>
  );
};

export default ScannerFeedback;
