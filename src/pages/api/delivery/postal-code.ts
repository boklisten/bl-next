import type { NextApiRequest, NextApiResponse } from "next";

const PostalCode = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (!process.env["BRING_API_ID"] || !process.env["BRING_API_KEY"]) {
    throw new Error("Bring API env variables are undefined");
  }

  const bringHeaders = new Headers({
    "X-MyBring-API-Uid": process.env["BRING_API_ID"] ?? "",
    "X-MyBring-API-Key": process.env["BRING_API_KEY"] ?? "",
    "X-Bring-Client-URL": "https://boklisten.no",
  });
  let result;
  try {
    const postalLookupResult = await fetch(
      `https://api.bring.com/pickuppoint/api/postalCode/NO/getCityAndType/${request.body}.json`,
      { method: "GET", headers: bringHeaders }
    );
    result = await postalLookupResult.json();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ postalCity: " ", error });
  }

  if (result["error"] || !result["postalCode"]) {
    return response.status(200).json({});
  }

  return response.status(200).json({
    postalCity: result["postalCode"]["city"],
  });
};

export default PostalCode;
