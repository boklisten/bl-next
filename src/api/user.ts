import { UserDetail } from "@boklisten/bl-model";

import { add, patch } from "@/api/api";
import { parseTokensFromResponseDataAndStore } from "@/api/token";
import BL_CONFIG from "@/utils/bl-config";
import { verifyBlError } from "@/utils/types";

export const login = async (username: string, password: string) => {
  const apiResponse = await add(BL_CONFIG.login.local.url, {
    username,
    password,
  });
  if (!verifyBlError(apiResponse)) {
    parseTokensFromResponseDataAndStore(apiResponse.data);
  }
  return apiResponse;
};

export const registerUser = async (username: string, password: string) => {
  const apiResponse = await add(BL_CONFIG.register.local.url, {
    username,
    password,
  });
  if (!verifyBlError(apiResponse)) {
    parseTokensFromResponseDataAndStore(apiResponse.data);
  }
  return apiResponse;
};

export const updateUserDetails = async (
  userId: string,
  userDetails: Partial<UserDetail>,
) => {
  return await patch(
    `${BL_CONFIG.collection.userDetail}/${userId}`,
    userDetails,
  );
};
