import axios, { AxiosError } from "axios";

export const fetchData = async (url: string, method: string, data: unknown) => {
  try {
    return await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetcher = async (url: string) => {
  try {
    return await axios.get(url).then((response) => response.data.data);
  } catch (error) {
    if (!((error as AxiosError).response?.status === 404)) {
      throw error;
    }
    return [];
  }
};
