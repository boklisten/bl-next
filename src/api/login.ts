import { add } from "@/api/api";
import { parseTokensFromResponseDataAndStore } from "@/api/token";
import BL_CONFIG from "@/utils/bl-config";

export const login = async (username: string, password: string) => {
  const apiResponse = await add(BL_CONFIG.login.local.url, {
    username,
    password,
  });
  parseTokensFromResponseDataAndStore(apiResponse.data);
};
