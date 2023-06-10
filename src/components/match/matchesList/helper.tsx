import { Match, MatchVariant } from "@boklisten/bl-model";
import { Properties } from "csstype";
import { GroupedMatches, MatchWithDetails } from "../../../utils/types";

export const sectionStyle: Properties = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export function matchFulfilled(match: Match): boolean {
  return match._variant === MatchVariant.StandMatch
    ? match.deliveredItems.length >= match.expectedHandoffItems.length &&
        match.receivedItems.length >= match.expectedPickupItems.length
    : match.receivedCustomerItems.length >= match.expectedItems.length;
}

export function matchBegun(match: Match): boolean {
  return match._variant === MatchVariant.StandMatch
    ? match.deliveredItems.length > 0 || match.receivedItems.length > 0
    : match.receivedCustomerItems.length > 0;
}

export function formatActionsString(handoffItems: number, pickupItems: number) {
  const hasHandoffItems = handoffItems > 0;
  const hasPickupItems = pickupItems > 0;
  const s: string[] = [];
  s.push("Du skal ");

  if (hasHandoffItems) {
    s.push("levere ");
    if (handoffItems === 1) {
      s.push("én");
      if (!hasPickupItems) {
        s.push(" bok");
      }
    } else {
      s.push(`${handoffItems}`);
      if (!hasPickupItems) {
        s.push(" bøker");
      }
    }
    if (hasPickupItems) {
      s.push(" og ");
    }
  }
  if (hasPickupItems) {
    s.push("motta ");
    if (pickupItems === 1) {
      s.push("én bok");
    } else {
      s.push(`${pickupItems} bøker`);
    }
  }
  return s.join("");
}

export function groupMatchesByTimeAndLocation<T extends MatchWithDetails>(
  matches: T[]
): GroupedMatches<T> {
  const keyToData: Map<string, { time: number | null; location: string }> =
    new Map();
  const matchesByKey: Map<string, T[]> = new Map();
  for (const match of matches) {
    const date = match.meetingInfo.date
      ? new Date(match.meetingInfo.date)
      : null;
    const key = (date?.getTime() ?? null) + match.meetingInfo.location;
    const items = matchesByKey.get(key) ?? [];
    keyToData.set(key, {
      time: date?.getTime() ?? null,
      location: match.meetingInfo.location,
    });
    matchesByKey.set(key, items);
    items.push(match);
  }
  return { matchesByKey, keyToData };
}

/**
 * Sort groups by time ascending.
 *
 * @param groups the groups to sort
 * @returns array of keys of groups
 */
export function getSortedMatchGroups<T extends MatchWithDetails>(
  groups: GroupedMatches<T>
): string[] {
  const keys = [...groups.keyToData.keys()];
  keys.sort((a, b) => {
    const timeA = groups.keyToData.get(a)!.time;
    const timeB = groups.keyToData.get(b)!.time;
    if (!timeA) {
      return 1;
    }
    if (!timeB) {
      return -1;
    }
    return new Date(timeA) >= new Date(timeB) ? 1 : -1;
  });
  return keys;
}

export function formatDatetime(date: Date): string {
  return (
    date.toLocaleDateString("no") +
    " " +
    date.toLocaleTimeString("no", { timeStyle: "short" })
  );
}
