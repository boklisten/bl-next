import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Divider, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NextLink from "next/link";
import { DatePicker } from "@mui/lab";
import moment, { Moment } from "moment";
import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import { fetchData } from "requests";

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

const UserDetailEditor = ({
  isSignUp,
  defaultValues = {},
}: {
  isSignUp?: boolean;
  defaultValues?: Partial<UserEditorFields>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [postalCity, setPostalCity] = useState("");

  // eslint-disable-next-line unicorn/no-null
  const [birthday, setBirthday] = useState<Moment | null>(null);

  const isUnder18 = (): boolean => moment().diff(birthday, "years") < 18;

  const {
    register,
    handleSubmit,
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
          Registrer deg
        </Typography>
        {isSignUp && (
          <>
            <Button
              data-testid="facebook-button"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                padding: 2,
                background: "#1877F2",
                display: "flex",
                justifyContent: "left",
              }}
              startIcon={<FacebookRoundedIcon />}
              endIcon={<ChevronRightIcon />}
            >
              Registrer deg med Facebook
              <Box sx={{ flexGrow: 1 }}></Box>
            </Button>
            <Button
              data-testid="google-button"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                padding: 2,
                background: "#ea4335",
                display: "flex",
                justifyContent: "left",
              }}
              startIcon={<GoogleIcon />}
              endIcon={<ChevronRightIcon />}
            >
              Registrer deg med Google
              <Box sx={{ flexGrow: 1 }}></Box>
            </Button>
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
              {/*@ts-ignore*/}
              {message.message}
            </Alert>
          ))}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onFocus={() => setShowDetails(true)}
                required
                fullWidth
                id="email"
                label="Epost"
                autoComplete="email"
                error={errors.email ? true : false}
                //@ts-ignore
                {...register("email", {
                  required: "Du må fylle inn epost",
                  validate: (v) =>
                    isEmail(v) ? true : "Du må fylle inn en gyldig epost",
                })}
              />
            </Grid>
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
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </Grid>
            {showDetails && (
              <>
                <Grid item xs={12} sm={12} mt={1}>
                  <Typography variant="body1">Din informasjon</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    autoComplete="given-name"
                    fullWidth
                    id="firstName"
                    label="Fornavn"
                    error={errors.firstName ? true : false}
                    {...register("firstName", {
                      required: "Du må fylle inn fornavn",
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Etternavn"
                    autoComplete="family-name"
                    error={errors.lastName ? true : false}
                    {...register("lastName", {
                      required: "Du må fylle inn etternavn",
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Telefonnummer"
                    autoComplete="tel-national"
                    error={errors.phoneNumber ? true : false}
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
                    required
                    fullWidth
                    id="address"
                    label="Adresse"
                    autoComplete="street-address"
                    error={errors.address ? true : false}
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
                    required
                    fullWidth
                    id="postalCode"
                    label="Postnummer"
                    autoComplete="postal-code"
                    error={errors.postalCode ? true : false}
                    {...register("postalCode", {
                      // Need to have a separate onChange because of autofill not triggering validation
                      onChange: async (event) => {
                        if (!isPostalCode(event.target.value, "NO")) {
                          setPostalCity("");
                          return;
                        }

                        const response = await fetchData(
                          "/api/delivery/postal-code",
                          "POST",
                          event.target.value
                        );

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
                  >
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

                      if (!isUnder18()) {
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
                        autoComplete="bday"
                        required
                        fullWidth
                        helperText={parameters?.inputProps?.placeholder}
                        {...parameters}
                      />
                    )}
                  />
                </Grid>
                {isUnder18() && (
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
                        required
                        fullWidth
                        id="lastName"
                        label="Foresatt sitt fulle navn"
                        autoComplete="name"
                        error={errors.guardianName ? true : false}
                        {...register("guardianName", {
                          required: "Du må fylle inn foresatt sitt fulle navn",
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Foresatt sin epost"
                        autoComplete="email"
                        error={errors.guardianEmail ? true : false}
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
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Foresatt sitt telefonnummer"
                        autoComplete="tel-national"
                        error={errors.guardianPhoneNumber ? true : false}
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
                          Jeg godtar Boklistens
                          <NextLink href="/info/policies/conditions" passHref>
                            <Link sx={{ marginX: 0.4 }} target="_blank">
                              betingelser
                            </Link>
                          </NextLink>
                          og
                          <NextLink href="/info/policies/terms" passHref>
                            <Link sx={{ marginX: 0.4 }} target="_blank">
                              vilkår
                            </Link>
                          </NextLink>
                        </Typography>
                      }
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!showDetails || Object.entries(errors).length > 0}
          >
            Registrer deg
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NextLink href="/auth/login" passHref>
                <Link variant="body2">Har du allerede en konto? Logg inn</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDetailEditor;
