import { decodeToken } from "react-jwt";

import BlFetcher from "@/api/blFetcher";
import { add, get, removeAll } from "@/api/storage";
import BL_CONFIG from "@/utils/bl-config";
import { AccessToken, AuthResponse } from "@/utils/types";

const accessTokenName = BL_CONFIG.token.accessToken;
const refreshTokenName = BL_CONFIG.token.refreshToken;

export const haveAccessToken = (): boolean => {
  try {
    get(accessTokenName);
    return true;
  } catch {
    return false;
  }
};

export const haveRefreshToken = (): boolean => {
  try {
    get(refreshTokenName);
    return true;
  } catch {
    return false;
  }
};

export const addAccessToken = (value: string): void => {
  if (!value || value.length <= 0) {
    throw new Error("provided value is empty or undefined");
  }
  add(accessTokenName, value);
};

export const addRefreshToken = (value: string): void => {
  if (!value || value.length <= 0) {
    throw new Error("provided value is empty or undefined");
  }
  add(refreshTokenName, value);
};

export const getAccessToken = (): string => {
  try {
    return get(accessTokenName);
  } catch (error) {
    throw new Error("could not get accessToken: " + error);
  }
};

export const getRefreshToken = (): string => {
  try {
    return get(refreshTokenName);
  } catch (error) {
    throw new Error("could not get refreshToken: " + error);
  }
};

export const removeTokens = (): void => {
  removeAll();
};

export const getAccessTokenBody = (): AccessToken => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("could not get accessToken");
  }

  let decodedToken;
  try {
    decodedToken = decodeToken(token);
  } catch (error) {
    throw new Error("accessToken is not valid: " + error);
  }

  return decodedToken as AccessToken;
};

export const parseTokensFromResponseDataAndStore = (
  authResponse: AuthResponse,
): boolean => {
  let refreshToken = "";
  let accessToken = "";

  for (const d of authResponse) {
    if (!d.data || d.data.length <= 0) {
      throw new Error("data of refreshToken is not defined");
    }

    if (!d.documentName) {
      throw new Error("documentName is missing on return data");
    }

    if (d.documentName === "refreshToken") {
      refreshToken = d.data;
    } else if (d.documentName === "accessToken") {
      accessToken = d.data;
    }
  }

  if (
    !accessToken ||
    accessToken.length <= 0 ||
    !refreshToken ||
    refreshToken.length <= 0
  ) {
    throw new Error("tokens or one of the tokens are not defined");
  }

  addAccessToken(accessToken);
  addRefreshToken(refreshToken);

  return true;
};

export const fetchNewTokens = async () => {
  if (!haveRefreshToken()) {
    throw new Error("Login required");
  }
  const tokens = await BlFetcher.post<
    [
      {
        accessToken: string;
      },
      {
        refreshToken: string;
      },
    ]
  >("token", {
    refreshToken: getRefreshToken(),
  });
  addAccessToken(tokens[0].accessToken);
  addRefreshToken(tokens[1].refreshToken);
};
