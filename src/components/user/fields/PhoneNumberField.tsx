import { InputAdornment, TextFieldProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { forwardRef, Ref } from "react";

const PhoneNumberField = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement>) => (
    <TextField
      data-testid="phone-field"
      InputProps={{
        startAdornment: <InputAdornment position="start">+47</InputAdornment>,
      }}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]{8}",
      }}
      required
      fullWidth
      label="Telefonnummer"
      id="phoneNumber"
      autoComplete="tel-national"
      inputRef={ref}
      {...props}
    />
  ),
);
PhoneNumberField.displayName = "PhoneNumberField";

export default PhoneNumberField;
