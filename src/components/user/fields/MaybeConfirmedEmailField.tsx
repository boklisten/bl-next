import { Check, Info } from "@mui/icons-material";
import { InputAdornment, TextFieldProps, Tooltip } from "@mui/material";
import React, { forwardRef, Ref } from "react";

import EmailField from "@/components/user/fields/EmailField";

type EmailFieldProps = Omit<TextFieldProps, "ref"> & {
  isSignUp: boolean | undefined;
  isEmailConfirmed: boolean | undefined;
};

const MaybeConfirmedEmailField = forwardRef(
  (
    { isSignUp, isEmailConfirmed, ...props }: EmailFieldProps,
    ref: Ref<HTMLInputElement>,
  ) => (
    <EmailField
      InputProps={{
        endAdornment: (
          <>
            {!isSignUp && (
              <InputAdornment position={"end"}>
                <Tooltip
                  title={isEmailConfirmed ? "Bekreftet" : "Ikke bekreftet"}
                >
                  {isEmailConfirmed ? (
                    <Check color={"success"} />
                  ) : (
                    <Info color={"warning"} />
                  )}
                </Tooltip>
              </InputAdornment>
            )}
          </>
        ),
      }}
      ref={ref}
      disabled={!isSignUp}
      helperText={
        isSignUp ? "" : "Ta kontakt dersom du ønsker å endre e-postadresse"
      }
      {...props}
    />
  ),
);
MaybeConfirmedEmailField.displayName = "MaybeConfirmedEmailField";

export default MaybeConfirmedEmailField;
