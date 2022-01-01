import BL_CONFIG from "../utils/bl-config";
import { getAccessToken, haveAccessToken } from "./token";

export const apiPath = (collection: string, query?: string) => {
  const path = BL_CONFIG.api.basePath;

  if (query) {
    return path + collection + query;
  }

  return path + collection;
};

export const getHeaders = () => {
  if (haveAccessToken()) {
    const accessToken = getAccessToken();
    return createHeaders(accessToken);
  } else {
    return createHeaders();
  }
};

const createHeaders = (authToken?: string) => {
  if (authToken) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    };
  }
  return { "Content-Type": "application/json" };
};
