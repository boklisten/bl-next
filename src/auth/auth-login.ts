import { haveAccessToken, removeTokens } from "./token";

export const isLoggedIn = () => haveAccessToken();

export const logout = () => removeTokens();
