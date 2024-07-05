import { UserDetail } from "@boklisten/bl-model";

import BlFetcher from "@/api/blFetcher";
import { parseTokensFromResponseDataAndStore } from "@/api/token";
import BL_CONFIG from "@/utils/bl-config";
import { AuthResponse, verifyBlApiError } from "@/utils/types";

export const login = async (username: string, password: string) => {
  const loginResponse = await BlFetcher.post<AuthResponse>(
    BL_CONFIG.login.local.url,
    {
      username,
      password,
    },
  );
  if (!verifyBlApiError(loginResponse)) {
    parseTokensFromResponseDataAndStore(loginResponse);
  }
  return loginResponse;
};

export const registerUser = async (username: string, password: string) => {
  const registerResponse = await BlFetcher.post<AuthResponse>(
    BL_CONFIG.register.local.url,
    {
      username,
      password,
    },
  );
  if (!verifyBlApiError(registerResponse)) {
    parseTokensFromResponseDataAndStore(registerResponse);
  }
  return registerResponse;
};

export const updateUserDetails = async (
  userId: string,
  userDetails: Partial<UserDetail>,
) => {
  return await BlFetcher.patch(
    `${BL_CONFIG.collection.userDetail}/${userId}`,
    userDetails,
  );
};

export const resetPassword = async (
  userId: string,
  resetToken: string,
  newPassword: string,
) => {
  return await BlFetcher.patch(
    `${BL_CONFIG.collection.pendingPasswordReset}/${userId}/${BL_CONFIG.pendingPasswordReset.confirm.operation}`,
    {
      resetToken,
      newPassword,
    },
  );
};
