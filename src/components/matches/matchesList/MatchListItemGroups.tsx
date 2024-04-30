import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { Typography } from "@mui/material";
import React from "react";

import {
  formatDatetime,
  sectionStyle,
  getSortedMatchGroups,
} from "@/components/matches/matchesList/helper";
import StandMatchListItem from "@/components/matches/matchesList/StandMatchListItem";
import UserMatchListItem from "@/components/matches/matchesList/UserMatchListItem";
import { GroupedMatches } from "@/utils/types";

export const MatchListItemGroups: React.FC<{
  groups: GroupedMatches<MatchWithDetails>;
  userId: string;
  heading: string;
}> = ({ groups, userId, heading }) => {
  return (
    <section style={sectionStyle}>
      <Typography variant="h2">{heading}</Typography>
      {getSortedMatchGroups(groups).map((key) => {
        const { time, location } = groups.keyToData.get(key)!;
        return (
          <section key={key} style={sectionStyle}>
            <Typography variant="h3">
              {time ? formatDatetime(new Date(time)) : ""} {location}
            </Typography>
            {groups.matchesByKey
              .get(key)!
              .map((match) =>
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
      })}
    </section>
  );
};
