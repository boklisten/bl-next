import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Image from "next/image";

const ScannerTutorial = () => {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  return (
    <>
      <Button
        variant={"contained"}
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
            paddingTop: "1rem",
            maxWidth: "95%",
          }}
        >
          <Typography variant="h4">Hvordan scanne bøker</Typography>

          <Card
            sx={{
              padding: "1rem",
              bgcolor: "#fefefa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "25rem",
            }}
          >
            <Typography sx={{ mb: ".4rem" }}>
              1. Scan eller skriv inn en boks unike ID, som ser slik ut:
            </Typography>
            <Image
              style={{ borderRadius: "2%" }}
              src={"/ullernUID.png"}
              alt={"Ullern VGS unik ID"}
              width={300}
              height={150}
            />
            <Typography sx={{ mb: ".4rem", mt: "1rem" }}>Eller slik</Typography>
            <Image
              style={{ borderRadius: "2%" }}
              src={"/blid.jpg"}
              alt={"BLID"}
              width={300}
              height={150}
            />
            <Typography sx={{ mb: ".4rem", mt: "1rem" }}>
              Sliter du med å finne IDen? Sjekk innsiden av boka, eller be om
              hjelp fra kontaktelev eller stand
            </Typography>
          </Card>

          <Card
            sx={{
              padding: "1rem",
              bgcolor: "#fefefa",
              mt: "1rem",
              width: "25rem",
            }}
          >
            <Typography>3. Gjenta til du har scannet alle bøkene </Typography>
          </Card>

          <Card
            sx={{
              padding: "1rem",
              bgcolor: "#fefefa",
              mt: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "25rem",
            }}
          >
            <Typography>
              4. Sjekk at både du og den som ga deg bøkene har fått det grønne
              merket{" "}
            </Typography>
            <Image
              style={{ borderRadius: "2%" }}
              src={"/ok_check.png"}
              alt={"OK Checkmark"}
              width={300}
              height={150}
            />
          </Card>
          <Button
            sx={{ marginY: "1rem" }}
            color={"success"}
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

export default ScannerTutorial;
