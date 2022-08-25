import React, { useEffect, useState } from "react";
import { Match } from "@boklisten/bl-model";
import { get } from "../../api/api";
import {
  Alert,
  Box,
  Card,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import ContactInfo from "../info/ContactInfo";
import MatchOverview from "./MatchOverview";
import { haveAccessToken } from "../../api/token";
import { useRouter } from "next/router";

const MatchPage = ({
  matchID,
  receive = false,
}: {
  matchID: string;
  receive: boolean;
}) => {
  const [match, setMatch] = useState<Match>();
  const [error, setError] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    if (!haveAccessToken()) {
      router.push(
        `/auth/login?redirect=/match/${receive ? "r" : "d"}/${matchID}`
      );
    }
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
  }, [matchID, receive, router]);

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
