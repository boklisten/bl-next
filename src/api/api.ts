import axios, { AxiosError, AxiosResponse } from "axios";

import { apiPath, getHeaders } from "api/apiRequest";
import { fetchNewTokens } from "api/token";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = async <T = any>(
  url: string,
  query?: string,
  noRetryTokens?: boolean,
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

export const addWithEndpoint = async (
  collection: string,
  endpoint: string,
  data: unknown,
) => {
  return await axios
    .post(`${apiPath(collection)}/${endpoint}`, data, {
      headers: getHeaders(),
    })
    .catch((error) => {
      const apiError: string | undefined = error?.response?.data?.msg;
      if (apiError === undefined || apiError === "server error") {
        throw new Error("Noe gikk galt! Ta kontakt med stand for hjelp.");
      }
      throw new Error(apiError);
    });
};

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
