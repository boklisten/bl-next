import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import EmailField from "@/components/user/fields/EmailField";
import FieldErrorAlert from "@/components/user/fields/FieldErrorAlert";
import PhoneNumberField from "@/components/user/fields/PhoneNumberField";
import { fieldValidators } from "@/components/user/user-detail-editor/fieldValidators";
import { UserEditorFields } from "@/components/user/user-detail-editor/useUserDetailEditorForm";

const GuardianInfoSection = ({
  errors,
  register,
}: {
  errors: FieldErrors<UserEditorFields>;
  register: UseFormRegister<UserEditorFields>;
}) => (
  <>
    <Grid item xs={12} sm={12} mt={1}>
      <Typography variant="body1">
        Siden du er under 18, trenger vi informasjon om en av dine foresatte.
      </Typography>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <TextField
        data-testid="guardian-name-field"
        required
        fullWidth
        id="lastName"
        label="Foresatt sitt fulle navn"
        autoComplete="name"
        error={!!errors.guardianName}
        {...register("guardianName", fieldValidators.guardianName)}
      />
      <FieldErrorAlert error={errors.guardianName} />
    </Grid>
    <Grid item xs={12}>
      <EmailField
        data-testid="guardian-email-field"
        label="Foresatt sin epost"
        error={!!errors.guardianEmail}
        {...register("guardianEmail", fieldValidators.guardianEmail)}
      />
      <FieldErrorAlert error={errors.guardianEmail} />
    </Grid>
    <Grid item xs={12}>
      <PhoneNumberField
        data-testid="guardian-phone-field"
        id="guardianPhoneNumber"
        label="Foresatt sitt telefonnummer"
        error={!!errors.guardianPhoneNumber}
        {...register(
          "guardianPhoneNumber",
          fieldValidators.guardianPhoneNumber,
        )}
      />
      <FieldErrorAlert error={errors.guardianPhoneNumber} />
    </Grid>
  </>
);

export default GuardianInfoSection;
