import React, { PropsWithChildren } from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import DynamicLink from "../../DynamicLink";

const MatchListItemBox: React.FC<
  PropsWithChildren<{ finished: boolean; matchId: string }>
> = ({ finished, matchId, children }) => {
  return (
    <Card
      variant={finished ? "outlined" : "elevation"}
      elevation={finished ? 0 : 8}
    >
      <CardContent>{children}</CardContent>
      <CardActions>
        <Button component={DynamicLink} href={`/match/${matchId}`} size="small">
          Detaljer
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchListItemBox;
