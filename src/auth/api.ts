import axios from "axios";
import { apiPath, getHeaders } from "./apiRequest";

export const add = async (collection: string, data: unknown) => {
  const response = await axios.post(apiPath(collection), data, {
    headers: getHeaders(),
  });
  return response;
};
