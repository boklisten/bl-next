import axios, { AxiosError, AxiosResponse } from "axios";
import { apiPath, getHeaders } from "./apiRequest";
import { fetchNewTokens } from "./token";

export const get = async <T = any>(
  url: string,
  query?: string,
  noRetryTokens?: boolean
): Promise<AxiosResponse<T>> => {
  if (!url || url.length === 0) {
    throw new Error("url is undefined");
  }

  return await axios
    .get<T>(apiPath(url, query), {
      headers: getHeaders(),
    })
    .catch(async (error) => {
      if (error.status === 404 || error.response.status === 404) {
        throw new Error("Not found");
      }
      console.log(error);

      if (
        (error.status === 401 || error.response.status === 401) &&
        !noRetryTokens
      ) {
        await fetchNewTokens();
        return await get(url, query, true);
      }

      throw new Error("Unknown API error");
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

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const apiFetcher = async <T = any>(url: string): Promise<T> => {
  try {
    return await get<{ data: T }>(url).then((response) => response.data.data);
  } catch (error) {
    if (!((error as AxiosError).response?.status === 404)) {
      throw error;
    }

    throw new NotFoundError(`API request resulted in 404: ${url}`);
  }
};
