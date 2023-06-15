import React, { useEffect, useState } from "react";
import { Match } from "@boklisten/bl-model";
import { get } from "../../api/api";
import {
  Alert,
  Box,
  Card,
  Container,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import ContactInfo from "../info/ContactInfo";
import MatchOverview from "./MatchOverview";

const MatchPage = ({
  matchID,
  receive = false,
}: {
  matchID: string;
  receive: boolean;
}) => {
  const [match, setMatch] = useState<Match>();
  const [error, setError] = useState<boolean>();

  useEffect(() => {
    const matchUrl = `matches/${matchID}`;
    const fetchInfo = async () => {
      try {
        const matchResponse = await get(matchUrl);
        setMatch(matchResponse.data.data[0]);
        setError(false);
      } catch {
        setError(true);
      }
    };

    fetchInfo();
  }, [matchID]);

  return (
    <Card sx={{ paddingBottom: "2rem" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
        >
          Overlevering av bøker
          <Tooltip title="Din klasse har blitt valgt ut til å teste Boklistens nye system for bokoverlevering.">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: ".4rem",
              }}
            >
              <Typography
                sx={{
                  background: "#9acd32",
                  color: "white",
                  borderRadius: "6%",
                  width: "4rem",
                }}
              >
                BETA
              </Typography>
            </Box>
          </Tooltip>
        </Typography>

        {!error &&
          !match &&
          [0, 1, 2].map((id) => (
            <Box key={"skeleton-" + id}>
              <Skeleton width={500} sx={{ marginTop: 4, marginBottom: 2 }} />
              <Skeleton variant="rectangular" width={500} height={60} />
            </Box>
          ))}

        {error && (
          <Alert severity="error" data-testid="api-error">
            Noe gikk galt under innlasting av overlevering. Dersom du mener
            dette er feil, vennligst ta kontakt med oss.
            <ContactInfo />
          </Alert>
        )}

        {!error && match && <MatchOverview match={match} receive={receive} />}
      </Container>
    </Card>
  );
};

export default MatchPage;
