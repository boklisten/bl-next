import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  Container,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Match } from "@boklisten/bl-model";
import { add } from "../../api/api";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CreateIcon from "@mui/icons-material/Create";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CropFreeIcon from "@mui/icons-material/CropFree";
import BarcodeQrScanner from "./BarcodeQrScanner";

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
    reason?: string
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

const ScannerTutorial = () => {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  return (
    <>
      <Button
        variant={"contained"}
        sx={{ background: "green", mb: "2rem" }}
        onClick={() => setTutorialOpen(true)}
        startIcon={<QuestionMarkIcon />}
      >
        Vis instruksjoner
      </Button>
      <Modal open={tutorialOpen} sx={{ overflow: "scroll" }}>
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
          <Typography variant="h4">Hvordan scanne bøker</Typography>

          <Card sx={{ padding: "1rem", bgcolor: "#fefefa" }}>
            <Typography>
              1. Scan en bok sin unike ID, som ser slik ut:{" "}
            </Typography>
            <Image
              style={{ borderRadius: "2%" }}
              src={"/ullernUID.png"}
              alt={"Ullern VGS unik ID"}
              width={300}
              height={150}
            />
          </Card>

          <Card sx={{ padding: "1rem", bgcolor: "#fefefa", mt: "1rem" }}>
            <Typography>2. Scan bokas ISBN, som ser slik ut: </Typography>
            <Image
              style={{ borderRadius: "2%" }}
              src={"/isbn.png"}
              alt={"Eksempel på ISBN"}
              width={300}
              height={150}
            />
          </Card>

          <Card sx={{ padding: "1rem", bgcolor: "#fefefa", mt: "1rem" }}>
            <Typography>3. Gjenta til du har scannet alle bøkene </Typography>
          </Card>
          <Button
            sx={{ marginY: "1rem" }}
            color={"error"}
            variant={"contained"}
            onClick={() => setTutorialOpen(false)}
          >
            Lukk
          </Button>
        </Container>
      </Modal>
    </>
  );
};

const ScannerModal = ({
  open,
  handleClose,
  handleSubmit,
  displayFeedback,
}: {
  open: boolean;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (blid: string, isbn: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  displayFeedback: (feedback: string, severity: AlertColor) => void;
}) => {
  const [blid, setBlid] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleScan = useCallback(
    (result: string) => {
      if (result.length === 8) {
        setBlid(result);
        displayFeedback("Unik ID registrert! Scan bokas ISBN", "success");
      } else if (result.length === 13) {
        setIsbn(result);
        displayFeedback("ISBN er registrert!", "success");
      }
    },
    [displayFeedback, setBlid]
  );

  useEffect(() => {
    if (isbn && !blid) {
      setIsbn("");
      displayFeedback(
        "Du må scanne Unik ID først! Se instruksjonene om du er usikker.",
        "error"
      );
    }
    if (blid && isbn) {
      handleSubmit(blid, isbn);
      setBlid("");
      setIsbn("");
    }
    // Future: when blid && !isbn => check if they are already connected
  }, [blid, isbn, handleSubmit, displayFeedback]);

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
          {blid === "" ? "Unik ID" : "ISBN"}
        </Typography>
        <CropFreeIcon sx={{ zIndex: 100, fontSize: "200px" }} />
        <Button
          color={"error"}
          sx={{ position: "absolute", top: 80, zIndex: 100 }}
          variant={"contained"}
          onClick={() => {
            setBlid("");
            setIsbn("");
            handleClose();
          }}
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

const ManualRegistrationModal = ({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (blid: string, isbn: string) => Promise<boolean>;
}) => {
  const [isbn, setIsbn] = useState("");
  const [blid, setBlid] = useState("");
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
        <TextField
          value={blid}
          label="unik ID"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
          onChange={(event) => setBlid(event.target.value)}
        />
        <TextField
          value={isbn}
          label="ISBN"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
          onChange={(event) => setIsbn(event.target.value)}
        />
        <Box sx={{ marginBottom: "1rem" }}>
          <Button
            sx={{ marginRight: "1rem" }}
            color={"error"}
            variant={"contained"}
            onClick={handleClose}
          >
            Lukk
          </Button>
          <LoadingButton
            loading={loading}
            variant={"contained"}
            onClick={async () => {
              setLoading(true);
              const success = await handleSubmit(blid, isbn);
              setLoading(false);
              if (success) {
                setBlid("");
                setIsbn("");
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

const invalidBlid = (blid: string) =>
  blid.length !== 8 || Number.isNaN(Number(blid));

const invalidISBN = (isbn: string) =>
  isbn.length !== 13 || Number.isNaN(Number(isbn));

const Scanner = ({
  match,
  forceUpdate,
}: {
  match: Match;
  forceUpdate: () => void;
}) => {
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

  const handleRegistration = async (
    blid: string,
    isbn: string
  ): Promise<boolean> => {
    if (invalidBlid(blid)) {
      displayFeedback("Unik ID er feilformatert!", "error");
      return false;
    }

    if (invalidISBN(isbn)) {
      displayFeedback("ISBN er feilformatert!", "error");
      return false;
    }

    // @ts-ignore
    const matchItem = match.items.find((item) => String(item.isbn) === isbn);
    if (!matchItem) {
      displayFeedback("ISBN samsvarer ikke med bestilte bøker", "error");
      return false;
    }

    // @ts-ignore
    if (matchItem.blid) {
      displayFeedback("Denne boken har allerede blitt registrert", "error");
      return false;
    }

    // @ts-ignore
    if (match.items.some((item) => item.blid === blid)) {
      displayFeedback(
        "Denne unike IDen er allerede registrert på en annen bok",
        "error"
      );
      return false;
    }

    match.events.push({
      type: "items-sent",
      time: new Date(),
    });

    // @ts-ignore
    matchItem.blid = blid;

    try {
      await add("matches", match);
    } catch (error) {
      console.log(error);
    }

    forceUpdate();

    displayFeedback("Boken ble registrert!", "success");

    setManualRegistrationModalOpen(false);
    setScanModalOpen(false);
    return true;
  };

  return (
    <>
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
        displayFeedback={displayFeedback}
      />
    </>
  );
};

export default Scanner;
