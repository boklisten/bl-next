import { MatchWithDetails } from "@boklisten/bl-model";
import { Properties } from "csstype";
import { GroupedMatches } from "../../../utils/types";

export const sectionStyle: Properties = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export function formatActionsString(handoffItems: number, pickupItems: number) {
  const hasHandoffItems = handoffItems > 0;
  const hasPickupItems = pickupItems > 0;
  const stringBuilder: string[] = [];
  stringBuilder.push("Du skal ");

  if (hasHandoffItems) {
    stringBuilder.push("levere ");
    if (handoffItems === 1) {
      stringBuilder.push("én");
      if (!hasPickupItems) {
        stringBuilder.push(" bok");
      }
    } else {
      stringBuilder.push(`${handoffItems}`);
      if (!hasPickupItems) {
        stringBuilder.push(" bøker");
      }
    }
    if (hasPickupItems) {
      stringBuilder.push(" og ");
    }
  }
  if (hasPickupItems) {
    stringBuilder.push("motta ");
    if (pickupItems === 1) {
      stringBuilder.push("én bok");
    } else {
      stringBuilder.push(`${pickupItems} bøker`);
    }
  }
  return stringBuilder.join("");
}

/**
 * Groups array of matches location.
 *
 * If the input-array is sorted by time, then the output will be as well
 * (assuming for-of or other insertion-order iteration of keys).
 *
 * @param matches the matches to group
 */
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
  const dateString = date.toLocaleDateString("no");
  const timeString = date.toLocaleTimeString("no", { timeStyle: "short" });
  return `${dateString} ${timeString}`;
}
