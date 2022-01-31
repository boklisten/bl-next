import axios from "axios";
import { apiPath, getHeaders } from "./apiRequest";
import { fetchNewTokens } from "./token";

const fetchTokensAndGet: any = async (url: string) => {
  await fetchNewTokens();
  return get(url);
};

export const get = async (url: string, query?: string) => {
  if (!url || url.length === 0) {
    throw new Error("url is undefined");
  }

  return await axios
    .get(apiPath(url, query), {
      headers: getHeaders(),
    })
    .catch((error) => {
      if (error.status === 404) {
        throw new Error("Not found");
      }

      return fetchTokensAndGet(url);
    });
};

export const add = async (collection: string, data: unknown) => {
  return await axios
    .post(apiPath(collection), data, {
      headers: getHeaders(),
    })
    .catch((error) => {
      throw new Error(error?.response?.data?.msg ?? "Noe gikk galt!");
    });
};
