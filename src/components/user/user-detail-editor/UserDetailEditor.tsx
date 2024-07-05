"use client";
import { UserDetail } from "@boklisten/bl-model";
import {
  Check,
  Email,
  Info,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import BlFetcher from "@/api/blFetcher";
import { getAccessTokenBody } from "@/api/token";
import { registerUser, updateUserDetails } from "@/api/user";
import CompanyLogo from "@/components/CompanyLogo";
import DynamicLink from "@/components/DynamicLink";
import FacebookButton from "@/components/user/FacebookButton";
import GoogleButton from "@/components/user/GoogleButton";
import {
  fieldValidators,
  UserEditorFields,
} from "@/components/user/user-detail-editor/field-validators";
import TermsAndConditionsDisclaimer from "@/components/user/user-detail-editor/TermsAndConditionsDisclaimer";
import BL_CONFIG from "@/utils/bl-config";
import { assertBlApiError } from "@/utils/types";

const isUnder18 = (birthday: moment.Moment | null): boolean => {
  return birthday !== null && moment().diff(birthday, "years") < 18;
};

const UserDetailEditor = ({
  isSignUp,
  userDetails = {} as UserDetail,
}: {
  isSignUp?: boolean;
  userDetails?: UserDetail;
}) => {
  const [emailConfirmationRequested, setEmailConfirmationRequested] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(!isSignUp);
  const [postalCity, setPostalCity] = useState<string | null>(
    userDetails?.postCity ?? null,
  );
  const [waitingForPostalCity, setWaitingForPostalCity] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValues = {
    email: userDetails.email,
    name: userDetails.name,
    phoneNumber: userDetails.phone,
    address: userDetails.address,
    postalCode: userDetails.postCode,
    birthday: userDetails.dob ? moment(userDetails.dob) : null,
    guardianName: userDetails.guardian?.name as string,
    guardianEmail: userDetails.guardian?.email as string,
    guardianPhoneNumber: userDetails.guardian?.phone as string,
  };

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UserEditorFields>({ mode: "onTouched", defaultValues });

  const onSubmit: SubmitHandler<UserEditorFields> = async (data) => {
    if (postalCity === null) {
      setError("postalCode", {
        message: "Du må oppgi et gyldig postnummer!",
      });
      return;
    }
    if (isSignUp) {
      try {
        await registerUser(data.email, data.password);
      } catch (error) {
        if (assertBlApiError(error)) {
          if (error.code === 903) {
            setError("email", {
              message:
                "Det finnes allerede en bruker med denne e-postadressen!",
            });
            return;
          }
          if (error.httpStatus === 500) {
            setError("email", {
              message:
                "Noe gikk galt under registreringen! Prøv igjen, eller ta kontakt dersom problemet vedvarer!",
            });
          }
        }
      }
    }
    try {
      await updateUserDetails(getAccessTokenBody().details, {
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        address: data.address,
        postCode: data.postalCode,
        postCity: postalCity,
        dob: data.birthday?.toDate() ?? new Date(),
        guardian: {
          name: data?.guardianName,
          email: data?.guardianEmail,
          phone: data?.guardianPhoneNumber,
        },
      });
    } catch (error) {
      if (assertBlApiError(error)) {
        setError("email", {
          message:
            "Noe gikk galt under registreringen! Prøv igjen, eller ta kontakt dersom problemet vedvarer!",
        });
      }
    }
    router.replace("/" + (searchParams.get("redirect") ?? ""));
  };

  async function onPostalCodeChange(event: { target: { value: string } }) {
    setPostalCity(null);
    if (event.target.value.length === 0) {
      return;
    }
    setWaitingForPostalCity(true);
    const response = await BlFetcher.post<
      [
        {
          postalCity: string | null;
        },
      ]
    >(
      `${BL_CONFIG.collection.delivery}/${BL_CONFIG.delivery.postalCodeLookup.operation}`,
      { postalCode: event.target.value },
    );
    setWaitingForPostalCity(false);

    if (!response[0].postalCity) {
      setPostalCity(null);
      return;
    }

    setPostalCity(response[0].postalCity);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Stack alignItems={"center"} mt={4}>
        <CompanyLogo />
        <Typography component="h1" variant="h5" sx={{ my: 1 }}>
          {isSignUp ? "Registrer deg" : "Innstillinger"}
        </Typography>
        {isSignUp && (
          <>
            <FacebookButton label={"Registrer deg med Facebook"} />
            <GoogleButton label={"Registrer deg med Google"} />
            <Divider sx={{ width: "100%", mt: 3, mb: 1 }}>
              Eller, registrer deg med med epost
            </Divider>
          </>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(errors).map(([type, message]) => (
            <Alert
              key={type}
              severity="error"
              data-testid="error-message"
              sx={{ marginY: 1 }}
            >
              {message.message}
            </Alert>
          ))}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <TextField
                  data-testid="email-field"
                  onFocus={() => setShowDetails(true)}
                  required
                  disabled={!isSignUp}
                  fullWidth
                  id="email"
                  label="E-post"
                  autoComplete="email"
                  error={!!errors.email}
                  {...register("email", fieldValidators.email)}
                />
                {!isSignUp && (
                  <InputAdornment
                    position="end"
                    sx={{ position: "absolute", mr: 1 }}
                  >
                    <Tooltip
                      title={
                        userDetails.emailConfirmed
                          ? "Bekreftet"
                          : "Ikke bekreftet"
                      }
                    >
                      {userDetails.emailConfirmed ? (
                        <Check color={"success"} />
                      ) : (
                        <Info color={"warning"} />
                      )}
                    </Tooltip>
                  </InputAdornment>
                )}
              </Box>
              {!isSignUp && !userDetails.emailConfirmed && (
                <>
                  {emailConfirmationRequested ? (
                    <Alert sx={{ mt: 1 }} icon={<Email />}>
                      Bekreftelseslenke er sendt til din e-post-adresse! Sjekk
                      søppelpost om den ikke dukker opp i inbox.
                    </Alert>
                  ) : (
                    <Button
                      onClick={async () => {
                        try {
                          await BlFetcher.post(
                            BL_CONFIG.collection.emailValidation,
                            {
                              userDetail: userDetails.id,
                              email: userDetails.email,
                            },
                          );
                          setEmailConfirmationRequested(true);
                        } catch (error) {
                          if (assertBlApiError(error)) {
                            setError("email", {
                              message:
                                "Klarte ikke sende ny bekreftelseslenke. Vennligst prøv igjen, eller ta kontakt hvis problemet vedvarer.",
                            });
                            return;
                          }
                        }
                      }}
                    >
                      Send bekreftelseslenke på nytt
                    </Button>
                  )}
                </>
              )}
            </Grid>
            {isSignUp && (
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <TextField
                  data-testid="password-field"
                  onFocus={() => setShowDetails(true)}
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="password"
                  label="Passord"
                  autoComplete="new-password"
                  error={!!errors.password}
                  {...register("password", fieldValidators.password)}
                />
                <InputAdornment
                  position="end"
                  sx={{ position: "absolute", mr: 1 }}
                >
                  <Tooltip
                    title={showPassword ? "Skjul passord" : "Vis passord"}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(
                        event: React.MouseEvent<HTMLButtonElement>,
                      ) => {
                        event.preventDefault();
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              </Grid>
            )}
            {showDetails && (
              <>
                <Grid item xs={12} sm={12} mt={1}>
                  <Typography variant="body1">Din informasjon</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    data-testid="name-field"
                    required
                    autoComplete="name"
                    fullWidth
                    id="name"
                    label="Navn"
                    error={!!errors.name}
                    {...register("name", fieldValidators.name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    data-testid="phone-field"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Telefonnummer"
                    autoComplete="tel-national"
                    error={!!errors.phoneNumber}
                    {...register("phoneNumber", fieldValidators.phoneNumber)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    data-testid="address-field"
                    required
                    fullWidth
                    id="address"
                    label="Adresse"
                    autoComplete="street-address"
                    error={!!errors.address}
                    {...register("address", fieldValidators.address)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"end"}
                  alignItems={"center"}
                >
                  <TextField
                    data-testid="postal-code-field"
                    required
                    fullWidth
                    id="postalCode"
                    label="Postnummer"
                    autoComplete="postal-code"
                    error={!!errors.postalCode}
                    {...register("postalCode", {
                      // Need to have a separate onChange because of autofill not triggering validation
                      onChange: onPostalCodeChange,
                      ...fieldValidators.postalCode,
                    })}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      mr: 3,
                      pointerEvents: "none",
                    }}
                    variant="subtitle1"
                    color="gray"
                    data-testid="postal-city-preview"
                  >
                    {waitingForPostalCity && (
                      <Skeleton
                        variant="rectangular"
                        width={50}
                        height="1rem"
                      />
                    )}
                    {postalCity}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    {...register("birthday", fieldValidators.birthday)}
                    name="birthday"
                    render={() => {
                      return (
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="Fødselsdato"
                          format="DD/MM/YYYY"
                          minDate={moment().subtract(100, "years")}
                          maxDate={moment().subtract(10, "years")}
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={getValues("birthday")}
                          onChange={(newValue) => {
                            setValue("birthday", newValue, {
                              shouldValidate: true,
                            });
                            if (!isUnder18(newValue)) {
                              clearErrors("guardianName");
                              clearErrors("guardianEmail");
                              clearErrors("guardianPhoneNumber");
                            }
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
                {isUnder18(getValues("birthday") ?? null) && (
                  <>
                    <Grid item xs={12} sm={12} mt={1}>
                      <Typography variant="body1">
                        Siden du er under 18, trenger vi informasjon om en av
                        dine foresatte.
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
                        {...register(
                          "guardianName",
                          fieldValidators.guardianName,
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        data-testid="guardian-email-field"
                        required
                        fullWidth
                        id="email"
                        label="Foresatt sin epost"
                        autoComplete="email"
                        error={!!errors.guardianEmail}
                        {...register(
                          "guardianEmail",
                          fieldValidators.guardianEmail,
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        data-testid="guardian-phone-field"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Foresatt sitt telefonnummer"
                        autoComplete="tel-national"
                        error={!!errors.guardianPhoneNumber}
                        {...register(
                          "guardianPhoneNumber",
                          fieldValidators.guardianPhoneNumber,
                        )}
                      />
                    </Grid>
                  </>
                )}
                {isSignUp && (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          data-testid="tos-field"
                          sx={{
                            color: errors.agreeToTermsAndConditions
                              ? "red"
                              : "inherit",
                          }}
                          {...register(
                            "agreeToTermsAndConditions",
                            fieldValidators.agreeToTermsAndConditions,
                          )}
                        />
                      }
                      label={<TermsAndConditionsDisclaimer />}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
          <Button
            data-testid="submit-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? "Registrer deg" : "Lagre"}
          </Button>
          {isSignUp && (
            <DynamicLink href={"/auth/login"}>
              Har du allerede en konto? Logg inn
            </DynamicLink>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default UserDetailEditor;
