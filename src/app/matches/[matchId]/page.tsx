import { Metadata } from "next";
import React from "react";

import MatchDetail from "@/components/matches/MatchDetail";

export const metadata: Metadata = {
  title: "Overlevering av bøker | Boklisten.no",
  description: "Overlevering av bøker",
};

const MatchDetailPage = ({ params }: { params: { matchId: string } }) => {
  return <MatchDetail matchId={params.matchId} />;
};

export default MatchDetailPage;
