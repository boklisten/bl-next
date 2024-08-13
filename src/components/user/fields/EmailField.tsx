import { TextFieldProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { forwardRef, Ref } from "react";

const EmailField = forwardRef(
  (props: Omit<TextFieldProps, "ref">, ref: Ref<HTMLInputElement>) => (
    <TextField
      data-testid="email-field"
      label="E-post"
      inputProps={{
        inputMode: "email",
      }}
      required
      fullWidth
      id="email"
      autoComplete="email"
      inputRef={ref}
      {...props}
    />
  ),
);
EmailField.displayName = "EmailField";

export default EmailField;
