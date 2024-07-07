import { Alert } from "@mui/material";
import { FieldError } from "react-hook-form";

export default function FieldErrorAlert({
  error,
}: {
  error: FieldError | undefined;
}) {
  if (!error) return null;
  return (
    <Alert
      key={error.type}
      severity="error"
      data-testid="error-message"
      sx={{ mt: 1 }}
    >
      {error.message}
    </Alert>
  );
}
