import { add } from "./api";
import BL_CONFIG from "../utils/bl-config";
import { parseTokensFromResponseDataAndStore } from "./token";

export const login = async (username: string, password: string) => {
  const apiResponse = await add(BL_CONFIG.login.local.url, {
    username,
    password,
  });
  parseTokensFromResponseDataAndStore(apiResponse.data);
};
