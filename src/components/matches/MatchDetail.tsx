import React from "react";
import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { apiFetcher, NotFoundError } from "../../api/api";
import {
  Alert,
  Button,
  Card,
  Container,
  Link as MuiLink,
  Skeleton,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import BL_CONFIG from "../../utils/bl-config";
import { getAccessTokenBody } from "../../api/token";
import UserMatchDetail from "./UserMatchDetail";
import StandMatchDetail from "./StandMatchDetail";
import { ArrowBack } from "@mui/icons-material";

const MatchDetail = ({ matchId }: { matchId: string }) => {
  const { data: accessToken, error: tokenError } = useSWR("userId", () =>
    getAccessTokenBody()
  );
  const userId = accessToken?.details;

  const { data: match, error: matchesError } = useSWR(
    `${BL_CONFIG.collection.match}/me`,
    async (key) => {
      const matches = await apiFetcher<MatchWithDetails[]>(key);
      const match = matches.find((match) => match.id === matchId);
      if (!match) {
        throw new NotFoundError(
          "No match with this ID belonging to the current user"
        );
      }
      return match;
    },
    { refreshInterval: 5000 }
  );

  if (matchesError instanceof NotFoundError) {
    return (
      <Alert severity="error">
        Kunne ikke finne en overlevering med ID {matchId}.
      </Alert>
    );
  }

  if (tokenError || matchesError) {
    return <Alert severity="error">En feil har oppstått.</Alert>;
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
        {/* Using MuiLink because DynamicLink causes `matches` to be undefined when
         returning to MatchesList for some reason, and somehow bypassing the undefined-check and
          erroring */}
        <MuiLink
          href={`/${BL_CONFIG.collection.match}`}
          sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          <Button startIcon={<ArrowBack />}>Alle overleveringer</Button>
        </MuiLink>
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
