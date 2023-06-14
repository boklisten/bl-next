import React from "react";
import { formatDatetime, sectionStyle, getSortedMatchGroups } from "./helper";
import { Typography } from "@mui/material";
import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import StandMatchListItem from "./StandMatchListItem";
import UserMatchListItem from "./UserMatchListItem";
import { GroupedMatches } from "../../../utils/types";

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
                )
              )}
          </section>
        );
      })}
    </section>
  );
};
