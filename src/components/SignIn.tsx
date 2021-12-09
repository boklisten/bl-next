import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import isEmail from "validator/lib/isEmail";
import { Alert, Divider } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NextLink from "next/link";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [errors, setErrors] = useState<FieldError[]>([]);

  type FieldErrorType = "email" | "password";
  interface FieldError {
    message: string;
    type: FieldErrorType;
  }

  const validate = (type: FieldErrorType, value: string) => {
    let isValid = true;

    if (type === "email") {
      if (value.length === 0) {
        isValid = false;
        setErrors([...errors, { type, message: "Du må fylle inn epost!" }]);
      }

      if (!isEmail(value)) {
        isValid = false;
        setErrors([
          ...errors,
          { type, message: "Du må fylle inn en gyldig epost!" },
        ]);
      }
    }

    if (type === "password" && value.length === 0) {
      isValid = false;
      setErrors([...errors, { type, message: "Du må fylle inn passord!" }]);
    }

    if (isValid) {
      setErrors(errors.filter((error) => error.type !== type));
    }
    return isValid;
  };

  const validateAll = () =>
    validate("email", email) && validate("password", password);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateAll()) {
      console.log({
        email,
        password,
      });
    }
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
          Logg inn
        </Typography>
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
          Logg inn med Facebook
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
          Logg inn med Google
          <Box sx={{ flexGrow: 1 }}></Box>
        </Button>

        <Divider sx={{ width: "100%", mt: 3 }}>
          Eller, logg inn med epost
        </Divider>
        <Box component="form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <Alert severity="error" data-testid="error-message">
              {errors[0]?.message}
            </Alert>
          )}
          <TextField
            data-testid="email-field"
            onBlur={(event) => {
              validate("email", event.target.value);
              setEmail(event.target.value);
            }}
            onChange={(event) => {
              if (errors.some((error) => error.type === "email")) {
                validate("email", event.target.value);
                setEmail(event.target.value);
              }
            }}
            error={errors.some((error) => error.type === "email")}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Epost"
            name="email"
            autoComplete="email"
          />
          <TextField
            data-testid="password-field"
            onBlur={(event) => {
              setPassord(event.target.value);
              validate("password", event.target.value);
            }}
            onChange={(event) => {
              if (errors.some((error) => error.type === "password")) {
                validate("password", event.target.value);
                setEmail(event.target.value);
              }
            }}
            error={errors.some((error) => error.type === "password")}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passord"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            data-testid="login-submit"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={errors.length > 0}
          >
            Logg inn
          </Button>
          <Grid container>
            <Grid item xs>
              <NextLink href="/auth/forgot" passHref>
                <Link variant="body2" data-testid="forgot-password">
                  Glemt passord?
                </Link>
              </NextLink>
            </Grid>
            <Grid item>
              <NextLink href="/auth/register" passHref>
                <Link variant="body2">Har du ikke konto? Registrer deg</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
