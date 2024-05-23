import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { Typography } from "@mui/material";
import React from "react";

import { sectionStyle } from "@/components/matches/matchesList/helper";
import StandMatchListItem from "@/components/matches/matchesList/StandMatchListItem";
import UserMatchListItem from "@/components/matches/matchesList/UserMatchListItem";

export const MatchListItemGroups: React.FC<{
  matches: MatchWithDetails[];
  userId: string;
  heading?: string;
}> = ({ matches, userId, heading }) => {
  return (
    <section style={sectionStyle}>
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
    </section>
  );
};
