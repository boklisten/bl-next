import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { ArrowBack } from "@mui/icons-material";
import { Alert, Button, Card, Container, Skeleton } from "@mui/material";
import React from "react";
import useSWR from "swr";

import { apiFetcher } from "@/api/api";
import { getAccessTokenBody } from "@/api/token";
import DynamicLink from "@/components/DynamicLink";
import StandMatchDetail from "@/components/matches/StandMatchDetail";
import UserMatchDetail from "@/components/matches/UserMatchDetail";
import BL_CONFIG from "@/utils/bl-config";

const MatchDetail = ({ matchId }: { matchId: string }) => {
  const { data: accessToken, error: tokenError } = useSWR("userId", () =>
    getAccessTokenBody(),
  );
  const userId = accessToken?.details;

  const { data: matches, error: matchesError } = useSWR(
    `${BL_CONFIG.collection.match}/me`,
    apiFetcher<MatchWithDetails[]>,
    { refreshInterval: 5000 },
  );

  if (tokenError || matchesError) {
    return (
      <Alert severity="error">
        En feil har oppstått. Ta kontakt med info@boklisten.no dersom problemet
        vedvarer.
      </Alert>
    );
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
