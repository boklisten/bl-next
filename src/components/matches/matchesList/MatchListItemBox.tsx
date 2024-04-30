import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { PropsWithChildren } from "react";

import DynamicLink from "@/components/DynamicLink";

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
        <Button
          component={DynamicLink}
          href={`/matches/${matchId}`}
          size="small"
        >
          Detaljer
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchListItemBox;
