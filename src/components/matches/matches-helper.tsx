import { Match, MatchVariant, MatchWithDetails } from "@boklisten/bl-model";
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

import { StandMatchWithDetails, UserMatchWithDetails } from "@/utils/types";

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

export function calculateFulfilledStandMatchItems(
  match: StandMatchWithDetails,
): {
  fulfilledHandoffItems: string[];
  fulfilledPickupItems: string[];
} {
  const fulfilledHandoffItems = match.expectedHandoffItems.filter((item) =>
    match.deliveredItems.includes(item),
  );
  const fulfilledPickupItems = match.expectedPickupItems.filter((item) =>
    match.receivedItems.includes(item),
  );
  return { fulfilledHandoffItems, fulfilledPickupItems };
}

export function calculateFulfilledUserMatchCustomerItems(
  match: UserMatchWithDetails,
  isSender: boolean,
): string[] {
  return match.expectedItems.filter((item) =>
    (isSender ? match.deliveredBlIds : match.receivedBlIds).some(
      (blId) => match.blIdToItemMap[blId] === item,
    ),
  );
}

export function calculateItemStatuses<T extends MatchWithDetails>(
  match: T,
  // surpressing because it thinks "match" is an actual variable
  // eslint-disable-next-line no-unused-vars
  expectedItemsSelector: (match: T) => string[],
  fulfilledItems: string[],
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

/**
 * Checks if all expected items in a match are fulfilled.
 *
 * @param match
 * @param isSender Whether the user to check whether has fulfilled the match is the sender.
 * Ignored for StandMatch.
 */
export function isMatchFulfilled(
  match: MatchWithDetails,
  isSender: boolean,
): boolean {
  if (match._variant === MatchVariant.StandMatch) {
    const { fulfilledHandoffItems, fulfilledPickupItems } =
      calculateFulfilledStandMatchItems(match);
    return (
      fulfilledHandoffItems.length >= match.expectedHandoffItems.length &&
      fulfilledPickupItems.length >= match.expectedPickupItems.length
    );
  } else {
    return (
      calculateFulfilledUserMatchCustomerItems(match, isSender).length >=
      match.expectedItems.length
    );
  }
}

/**
 * Check if any expected items in a match are fulfilled.
 *
 * @param match
 * @param isSender Whether the user to check whether has fulfilled the match is the sender.
 * Ignored for StandMatch.
 */
export function isMatchBegun(
  match: MatchWithDetails,
  isSender: boolean,
): boolean {
  if (match._variant === MatchVariant.StandMatch) {
    const { fulfilledHandoffItems, fulfilledPickupItems } =
      calculateFulfilledStandMatchItems(match);
    return fulfilledHandoffItems.length > 0 || fulfilledPickupItems.length > 0;
  } else {
    return calculateFulfilledUserMatchCustomerItems(match, isSender).length > 0;
  }
}

/**
 * Check whether the user is the sender in the match.
 *
 * Returns whatever if match is a StandMatch.
 * @param match
 * @param currentUserId
 */
export function isUserSenderInMatch(
  match: Match,
  currentUserId: string,
): boolean {
  if (match._variant === MatchVariant.UserMatch) {
    return match.sender === currentUserId;
  }
  return false;
}
