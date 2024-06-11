import {
  Alert,
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
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
    if (reason === "clickaway" || severity === "info") {
      return;
    }

    handleClose();
  };

  return (
    <>
      <Snackbar
        open={open && severity !== "info"}
        onClose={autoClose}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={severity}>
          <Typography variant={"subtitle1"}>{feedback}</Typography>
        </Alert>
      </Snackbar>
      <Dialog open={severity === "info" && open}>
        <DialogContent>
          <Typography variant={"h1"}>Viktig informasjon</Typography>
          {feedback}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScannerFeedback;
