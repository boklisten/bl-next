import React from "react";
import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { apiFetcher } from "../../api/api";
import {
  Alert,
  Button,
  Card,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import BL_CONFIG from "../../utils/bl-config";
import { getAccessTokenBody } from "../../api/token";
import UserMatchDetail from "./UserMatchDetail";
import StandMatchDetail from "./StandMatchDetail";
import { ArrowBack } from "@mui/icons-material";
import DynamicLink from "../DynamicLink";

const MatchDetail = ({ matchId }: { matchId: string }) => {
  const { data: accessToken, error: tokenError } = useSWR("userId", () =>
    getAccessTokenBody()
  );
  const userId = accessToken?.details;

  const { data: matches, error: matchesError } = useSWR(
    `${BL_CONFIG.collection.match}/me`,
    apiFetcher<MatchWithDetails[]>,
    { refreshInterval: 5000 }
  );

  if (tokenError || matchesError) {
    return <Alert severity="error">En feil har oppstått.</Alert>;
  }

  const match = matches?.find((match) => match.id === matchId);
  if (matches && !match) {
    return (
      <Alert severity="error">
        Kunne ikke finne en overlevering med ID {matchId}.
      </Alert>
    );
  }

  if (!userId || !match) {
    return <Skeleton />;
  }

  return (
    <Card sx={{ paddingBottom: "2rem" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DynamicLink
          href={`/${BL_CONFIG.collection.match}`}
          sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          <Button startIcon={<ArrowBack />}>Alle overleveringer</Button>
        </DynamicLink>
        <Typography variant="h1">Overlevering av bøker</Typography>

        {match._variant === MatchVariant.StandMatch && (
          <StandMatchDetail match={match} currentUserId={userId} />
        )}
        {match._variant === MatchVariant.UserMatch && (
          <UserMatchDetail match={match} currentUserId={userId} />
        )}
      </Container>
    </Card>
  );
};

export default MatchDetail;
