import { add, get, remove } from "./storage";
import BL_CONFIG from "./bl-config";

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

export const removeTokens = (): void => {
  remove(accessTokenName);
  remove(refreshTokenName);
};

export const parseTokensFromResponseDataAndStore = (
  responseData: any
): boolean => {
  let refreshToken = "";
  let accessToken = "";

  if (!responseData.data) {
    throw new Error("responseData.data is not defined");
  }

  if (Object.prototype.toString.call(responseData.data) !== "[object Array]") {
    throw new Error("responseData.data is not an array");
  }

  const data = responseData.data;

  for (const d of data) {
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
