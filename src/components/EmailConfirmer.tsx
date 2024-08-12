"use client";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import BlFetcher from "@/api/blFetcher";
import CountdownToRedirect from "@/components/CountdownToRedirect";
import DynamicLink from "@/components/DynamicLink";
import BL_CONFIG from "@/utils/bl-config";
import { assertBlApiError } from "@/utils/types";

function validateEmail(confirmationId: string) {
  return BlFetcher.patch(
    `${BL_CONFIG.collection.emailValidation}/${confirmationId}/${BL_CONFIG.emailValidation.confirm.operation}`,
    {},
  );
}

export default function EmailConfirmer({
  confirmationId,
}: {
  confirmationId: string;
}) {
  const [status, setStatus] = useState<"WAIT" | "SUCCESS" | "ERROR">("WAIT");

  useEffect(() => {
    async function tryValidateEmail() {
      try {
        await validateEmail(confirmationId);
        setStatus("SUCCESS");
      } catch (error) {
        if (assertBlApiError(error)) {
          setStatus("ERROR");
        }
        return;
      }
    }
    tryValidateEmail();
  }, [confirmationId]);

  return (
    <>
      {status === "WAIT" && (
        <>
          <Typography variant="h1">Verifiserer e-post...</Typography>
          <CircularProgress />
        </>
      )}
      {status === "ERROR" && (
        <>
          <Alert severity={"error"} sx={{ my: 1 }}>
            Kunne ikke bekrefte e-post. Lenken kan være utløpt. Du kan prøve å
            sende en ny lenke fra brukerinnstillinger.
          </Alert>
          <DynamicLink href={"/user-settings"}>
            Gå til brukerinnstillinger
          </DynamicLink>
        </>
      )}
      {status === "SUCCESS" && (
        <>
          <Alert sx={{ my: 1 }}>E-postadressen ble bekreftet!</Alert>
          <CountdownToRedirect path={"/"} seconds={5} />
        </>
      )}
    </>
  );
}
