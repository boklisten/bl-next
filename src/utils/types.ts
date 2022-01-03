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
  info?: any;
  desc?: string;
  buyback?: boolean;
  categories?: string[];
}
