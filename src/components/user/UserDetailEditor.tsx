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
import moment, { Moment } from "moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";

import BlFetcher from "@/api/blFetcher";
import { getAccessTokenBody } from "@/api/token";
import { registerUser, updateUserDetails } from "@/api/user";
import DynamicLink from "@/components/DynamicLink";
import FacebookButton from "@/components/user/FacebookButton";
import GoogleButton from "@/components/user/GoogleButton";
import BL_CONFIG from "@/utils/bl-config";
import { assertBlApiError } from "@/utils/types";

type UserEditorFields = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  birthday: Moment | null;
  guardianName: string;
  guardianEmail: string;
  guardianPhoneNumber: string;
  agreeToTermsAndConditions: boolean;
};

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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/boklisten_logo_v2_icon_blue.png"
          width={50}
          height={50}
          alt="logo"
        />
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
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <TextField
                  data-testid="email-field"
                  onFocus={() => setShowDetails(true)}
                  required
                  disabled={!isSignUp}
                  fullWidth
                  id="email"
                  label="Epost"
                  autoComplete="email"
                  error={!!errors.email}
                  {...register("email", {
                    required: "Du må fylle inn epost",
                    validate: (v) =>
                      isEmail(v) ? true : "Du må fylle inn en gyldig epost",
                  })}
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
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
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
                  {...register("password", {
                    required: "Du må fylle inn passord",
                    minLength: {
                      value: 10,
                      message: "Passordet må minst ha 10 tegn",
                    },
                  })}
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
                    {...register("name", {
                      required: "Du må fylle inn navn",
                    })}
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
                    {...register("phoneNumber", {
                      required: "Du må fylle inn telefonnummer",
                      validate: (v) =>
                        isMobilePhone(v, "nb-NO")
                          ? true
                          : "Du må fylle inn et lovlig norsk telefonnummer (uten mellomrom og +47)",
                      minLength: {
                        value: 8,
                        message:
                          "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
                      },
                      maxLength: {
                        value: 8,
                        message:
                          "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
                      },
                    })}
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
                    {...register("address", {
                      required: "Du må fylle inn adresse",
                    })}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
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
                      onChange: async (event) => {
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
                      },
                      required: "Du må fylle inn postnummer",
                      validate: async (v) => {
                        const illegalPostalCodeMessage =
                          "Du må oppgi et gyldig norsk postnummer";
                        if (!isPostalCode(v, "NO")) {
                          return illegalPostalCodeMessage;
                        }

                        const response = await BlFetcher.post<
                          [
                            {
                              postalCity: string | null;
                            },
                          ]
                        >(
                          `${BL_CONFIG.collection.delivery}/${BL_CONFIG.delivery.postalCodeLookup.operation}`,
                          { postalCode: v },
                        );

                        if (!response[0].postalCity) {
                          return illegalPostalCodeMessage;
                        }

                        return true;
                      },
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
                    {...register("birthday", {
                      required: "Du må fylle inn fødselsdato",
                      valueAsDate: true,
                      validate: (v) =>
                        v?.isValid() &&
                        v.isAfter(moment().subtract(100, "years")) &&
                        v.isBefore(moment().subtract(10, "years"))
                          ? true
                          : "Du må fylle inn en gyldig fødselsdato",
                    })}
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
                        {...register("guardianName", {
                          required: "Du må fylle inn foresatt sitt fulle navn",
                        })}
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
                        {...register("guardianEmail", {
                          required: "Du må fylle inn foresatt sin epost",
                          validate: (v) =>
                            isEmail(v)
                              ? true
                              : "Du må fylle inn en gyldig epost",
                        })}
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
                        {...register("guardianPhoneNumber", {
                          required:
                            "Du må fylle inn foresatt sitt telefonnummer",
                          validate: (v) =>
                            isMobilePhone(v, "nb-NO")
                              ? true
                              : "Du må fylle inn et lovlig norsk telefonnummer (uten mellomrom og +47)",
                          minLength: {
                            value: 8,
                            message:
                              "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
                          },
                          maxLength: {
                            value: 8,
                            message:
                              "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
                          },
                        })}
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
                          {...register("agreeToTermsAndConditions", {
                            required: "Du må godta våre betingelser og vilkår",
                          })}
                        />
                      }
                      label={
                        <Typography>
                          {"Jeg godtar Boklistens "}
                          <DynamicLink
                            href={"/info/policies/conditions"}
                            target={"_blank"}
                            variant={"body1"}
                            underline={"hover"}
                          >
                            betingelser
                          </DynamicLink>
                          {" og "}
                          <DynamicLink
                            href={"/info/policies/terms"}
                            target={"_blank"}
                            variant={"body1"}
                            underline={"hover"}
                          >
                            vilkår
                          </DynamicLink>
                        </Typography>
                      }
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <DynamicLink href={"/auth/login"}>
                  Har du allerede en konto? Logg inn
                </DynamicLink>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserDetailEditor;
