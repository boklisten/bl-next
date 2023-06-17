import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { MatchWithDetails } from "@boklisten/bl-model";

export interface ItemStatus {
  id: string;
  title: string;
  fulfilled: boolean;
}

export const MatchHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="h2" sx={{ marginTop: 4, marginBottom: 2 }}>
      {children}
    </Typography>
  );
};

export function calculateItemStatuses<T extends MatchWithDetails>(
  match: T,
  // surpressing because it thinks "match" is an actual variable
  // eslint-disable-next-line no-unused-vars
  expectedItemsSelector: (match: T) => string[],
  fulfilledItems: string[]
): ItemStatus[] {
  return expectedItemsSelector(match)
    .map((id) => {
      const details = match.itemDetails[id];
      if (!details) {
        throw new Error(`Fant ikke detaljer for bok ${id}`);
      }
      return details;
    })
    .map((item) => ({
      id: item.id,
      title: item.title,
      fulfilled: fulfilledItems.includes(item.id),
    }));
}
