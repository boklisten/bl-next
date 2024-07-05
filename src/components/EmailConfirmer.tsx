"use client";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { patch } from "@/api/api";
import CountdownToRedirect from "@/components/CountdownToRedirect";
import DynamicLink from "@/components/DynamicLink";
import BL_CONFIG from "@/utils/bl-config";
import { verifyBlError } from "@/utils/types";

function validateEmail(confirmationId: string) {
  return patch(
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
      const response = await validateEmail(confirmationId);
      if (verifyBlError(response)) {
        setStatus("ERROR");
        return;
      }
      setStatus("SUCCESS");
    }
    tryValidateEmail();
  }, [confirmationId]);

  return (
    <>
      {status === "WAIT" && (
        <>
          <Typography component="h1" variant="h5" sx={{ my: 1 }}>
            Verifiserer e-post...
          </Typography>
          <CircularProgress />
        </>
      )}
      {status === "ERROR" && (
        <>
          <Alert severity={"error"} sx={{ my: 1 }}>
            Kunne ikke bekrefte e-post. Lenken kan være utløpt. Du kan prøve å
            sende en ny lenke fra innstillinger.
          </Alert>
          <DynamicLink href={"/settings"}>Gå til innstillinger</DynamicLink>
        </>
      )}
      {status === "SUCCESS" && (
        <>
          <Alert sx={{ mt: 1 }}>E-post-adressen ble bekreftet!</Alert>
          <CountdownToRedirect path={"/"} seconds={3} />
        </>
      )}
    </>
  );
}
