import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import "@mui/lab";
import moment, { Moment } from "moment";
import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import { fetchData } from "../../api/requests";
import { UserDetail } from "@boklisten/bl-model";
/*
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
*/
import DynamicLink from "../DynamicLink";

type UserEditorFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  birthday: Moment;
  guardianName: string;
  guardianEmail: string;
  guardianPhoneNumber: string;
  agreeToTermsAndConditions: boolean;
};

export const extractFirstName = (fullName: string): string => {
  if (!fullName || fullName.length <= 0) {
    return "";
  }

  const fullNameSplit = fullName.split(" ");

  if (fullNameSplit.length === 1) {
    return fullNameSplit[0] as string;
  }

  return fullName
    .split(" ")
    .slice(0, fullNameSplit.length - 1)
    .join(" ");
};

export const extractLastName = (fullName: string): string => {
  if (!fullName || fullName.length <= 0) {
    return "";
  }

  const fullNameSplit = fullName.split(" ");

  if (fullNameSplit.length > 1) {
    return fullNameSplit.slice(-1).join(" ");
  }
  return "";
};

const isUnder18 = (birthday: moment.Moment | null): boolean =>
  moment().diff(birthday, "years") < 18;

const UserDetailEditor = ({
  isSignUp,
  userDetails = {} as UserDetail,
}: {
  isSignUp?: boolean;
  userDetails?: UserDetail;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(!isSignUp);
  const [postalCity, setPostalCity] = useState(userDetails?.postCity ?? "");
  const [waitingForPostalCity, setWaitingForPostalCity] = useState(false);

  // eslint-disable-next-line unicorn/no-null
  const [birthday, setBirthday] = useState<Moment | null>(
    // eslint-disable-next-line unicorn/no-null
    userDetails?.dob ? moment(userDetails.dob) : null
  );

  const defaultValues = {
    email: userDetails.email,
    firstName: extractFirstName(userDetails.name),
    lastName: extractLastName(userDetails.name),
    phoneNumber: userDetails.phone,
    address: userDetails.address,
    postalCode: userDetails.postCode,
    guardianName: userDetails.guardian?.name as string,
    guardianEmail: userDetails.guardian?.email as string,
    guardianPhoneNumber: userDetails.guardian?.phone as string,
  };

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UserEditorFields>({ mode: "onTouched", defaultValues });

  const onSubmit: SubmitHandler<UserEditorFields> = (data) => {
    console.log(data);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          {isSignUp ? "Registrer deg" : "Innstillinger"}
        </Typography>
        {/*
        {isSignUp && (
          <>
            <FacebookButton label={"Registrer deg med Facebook"} />
            <GoogleButton label={"Registrer deg med Google"} />
            <Divider sx={{ width: "100%", mt: 3, mb: 1 }}>
              Eller, registrer deg med med epost
            </Divider>
          </>
        )}
          */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(errors).map(([type, message]) => (
            <Alert
              key={type}
              severity="error"
              data-testid="error-message"
              sx={{ marginY: 1 }}
            >
              {/*@ts-ignore*/}
              {message.message}
            </Alert>
          ))}
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                //@ts-ignore
                {...register("email", {
                  required: "Du må fylle inn epost",
                  validate: (v) =>
                    isEmail(v) ? true : "Du må fylle inn en gyldig epost",
                })}
              />
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
                  error={errors.password ? true : false}
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
                        event: React.MouseEvent<HTMLButtonElement>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    data-testid="first-name-field"
                    required
                    autoComplete="given-name"
                    fullWidth
                    id="firstName"
                    label="Fornavn"
                    error={!!errors.firstName}
                    {...register("firstName", {
                      required: "Du må fylle inn fornavn",
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    data-testid="last-name-field"
                    required
                    fullWidth
                    id="lastName"
                    label="Etternavn"
                    autoComplete="family-name"
                    error={!!errors.lastName}
                    {...register("lastName", {
                      required: "Du må fylle inn etternavn",
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
                        if (!isPostalCode(event.target.value, "NO")) {
                          trigger("postalCode");
                          setPostalCity("");
                          return;
                        }

                        setWaitingForPostalCity(true);
                        const response = await fetchData(
                          "/api/delivery/postal-code",
                          "POST",
                          event.target.value
                        );
                        setWaitingForPostalCity(false);

                        if (!response.postalCity) {
                          setPostalCity("");
                          return;
                        }

                        setPostalCity(response.postalCity);
                      },
                      required: "Du må fylle inn postnummer",
                      validate: async (v) => {
                        const illegalPostalCodeMessage =
                          "Du må oppgi et gyldig norsk postnummer";
                        if (!isPostalCode(v, "NO")) {
                          return illegalPostalCodeMessage;
                        }

                        const response = await fetchData(
                          "/api/delivery/postal-code",
                          "POST",
                          v
                        );

                        if (!response.postalCity) {
                          return illegalPostalCodeMessage;
                        }

                        return true;
                      },
                    })}
                  />
                  <Typography
                    sx={{ position: "absolute", mr: 3 }}
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
                  <DatePicker
                    label="Fødselsdato"
                    inputFormat="DD/MM/YYYY"
                    minDate={moment().subtract(100, "years")}
                    maxDate={moment().subtract(10, "years")}
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);

                      if (!isUnder18(birthday)) {
                        clearErrors("guardianName");
                        clearErrors("guardianEmail");
                        clearErrors("guardianPhoneNumber");
                      }
                    }}
                    onError={(error) =>
                      error
                        ? setError("birthday", {
                            type: "birthday",
                            message: "Du må fylle inn en lovlig fødselsdag",
                          })
                        : clearErrors("birthday")
                    }
                    renderInput={(parameters) => (
                      <TextField
                        data-testid="birthday-field"
                        id="birthday"
                        autoComplete="bday"
                        required
                        fullWidth
                        helperText={parameters?.inputProps?.placeholder}
                        {...parameters}
                      />
                    )}
                  />
                </Grid>
                {isUnder18(birthday) && (
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
                          Jeg godtar Boklistens{" "}
                          <DynamicLink
                            href={"/info/policies/conditions"}
                            label={"betingelser"}
                            target={"_blank"}
                          />{" "}
                          og{" "}
                          <DynamicLink
                            href={"/info/policies/terms"}
                            label={"vilkår"}
                            target={"_blank"}
                          />
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
            disabled={!showDetails || Object.entries(errors).length > 0}
          >
            {isSignUp ? "Registrer deg" : "Lagre"}
          </Button>
          {isSignUp && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <DynamicLink
                  href={"/auth/login"}
                  label={"Har du allerede en konto? Logg inn"}
                  testID={"login-link"}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserDetailEditor;
