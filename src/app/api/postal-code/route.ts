// TODO: use bl-api instead
export const POST = async (request: Request) => {
  if (!process.env["BRING_API_ID"] || !process.env["BRING_API_KEY"]) {
    throw new Error("Bring API env variables are undefined");
  }

  const bringHeaders = new Headers({
    "X-MyBring-API-Uid": process.env["BRING_API_ID"] ?? "",
    "X-MyBring-API-Key": process.env["BRING_API_KEY"] ?? "",
    "X-Bring-Client-URL": "https://boklisten.no",
  });
  const body = await request.json();
  let result;
  try {
    const postalLookupResult = await fetch(
      `https://api.bring.com/pickuppoint/api/postalCode/NO/getCityAndType/${body}.json`,
      { method: "GET", headers: bringHeaders },
    );
    result = await postalLookupResult.json();
  } catch (error) {
    console.error(error);
    return Response.json({ postalCity: " ", error }, { status: 500 });
  }

  if (result["error"] || !result["postalCode"]) {
    return Response.json({}, { status: 200 });
  }

  return Response.json(
    {
      postalCity: result["postalCode"]["city"],
    },
    { status: 200 },
  );
};
