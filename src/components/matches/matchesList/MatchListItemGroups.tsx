import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { Container, Typography } from "@mui/material";
import React from "react";

import StandMatchListItem from "@/components/matches/matchesList/StandMatchListItem";
import UserMatchListItem from "@/components/matches/matchesList/UserMatchListItem";

export const MatchListItemGroups: React.FC<{
  matches: MatchWithDetails[];
  userId: string;
  heading?: string;
}> = ({ matches, userId, heading }) => {
  return (
    <Container
      component={"section"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 2,
      }}
    >
      {heading && <Typography variant="h2">{heading}</Typography>}
      {matches.map((match) =>
        match._variant === MatchVariant.StandMatch ? (
          <StandMatchListItem
            key={match.id}
            match={match}
            currentUserId={userId}
          />
        ) : (
          <UserMatchListItem
            key={match.id}
            match={match}
            currentUserId={userId}
          />
        ),
      )}
    </Container>
  );
};
