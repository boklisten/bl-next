import { MatchVariant, MatchWithDetails } from "@boklisten/bl-model";

export type ItemType = "book";

export type UserPermission =
  | "customer"
  | "employee"
  | "manager"
  | "admin"
  | "super";

export interface AccessToken {
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  username: string;
  permission: UserPermission;
  details: string;
}

export interface BlDocument {
  id: string;
  blid?: string;
  lastUpdated?: Date;
  creationTime?: Date;
  comments?: Comment[];
  active?: boolean;
  user?: {
    // the user that created the document
    id: string; // the id of the user
    permission?: UserPermission; // the permission of the user
  };
  viewableFor?: string[]; // ids of other user that can edit this document if it is restricted
  viewableForPermission?: UserPermission; //the lowest permission user needs to view this document
  editableFor?: string[]; //ids of other users that can edit this document if it is restricted
  archived?: boolean; //if set this document is regarded as archived, and will not come in search results
}

export interface Item {
  title: string;
  type: ItemType;
  price: number;
  taxRate: number;
  digital?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any;
  desc?: string;
  buyback?: boolean;
  categories?: string[];
}

export type StandMatchWithDetails = Extract<
  MatchWithDetails,
  { _variant: MatchVariant.StandMatch }
>;

export type UserMatchWithDetails = Extract<
  MatchWithDetails,
  { _variant: MatchVariant.UserMatch }
>;

export interface GroupedMatches<T extends MatchWithDetails> {
  matchesByKey: Map<string, T[]>;
  keyToData: Map<string, { time: number | null; location: string }>;
}

export enum TextType {
  // eslint-disable-next-line no-unused-vars
  BLID,
  // eslint-disable-next-line no-unused-vars
  ISBN,
  // eslint-disable-next-line no-unused-vars
  UNKNOWN,
}

export type ScannedTextType = TextType.BLID | TextType.ISBN | TextType.UNKNOWN;

export interface MaybeEmptyEditableText {
  id: string;
  text: string | null;
}

export type BlError = {
  httpStatus: number;
  code: number;
  msg: string;
  data: unknown;
};

export function verifyBlError(blError: unknown): blError is BlError {
  const m = blError as Record<string, unknown> | null | undefined;
  return (
    !!m &&
    typeof m["httpStatus"] === "number" &&
    typeof m["code"] === "number" &&
    typeof m["msg"] === "string"
  );
}
