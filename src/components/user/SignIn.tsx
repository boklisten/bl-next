"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, IconButton, InputAdornment, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { login } from "@/api/user";
import { attachTokensToHref } from "@/components/AuthLinker";
import DynamicLink from "@/components/DynamicLink";
import FacebookButton from "@/components/user/FacebookButton";
import GoogleButton from "@/components/user/GoogleButton";
import BL_CONFIG from "@/utils/bl-config";
import { assertBlApiError } from "@/utils/types";

type SignInFields = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    setApiError("");
    try {
      await login(data.email, data.password);
    } catch (error) {
      if (assertBlApiError(error)) {
        if (error.code === 908) {
          setApiError("Feil brukernavn eller passord");
          return;
        }
        setApiError(
          "Noe gikk galt! Prøv igjen eller ta kontakt dersom problemet vedvarer.",
        );
      }
      return;
    }
    if (searchParams.get("caller") === "bl-admin") {
      router.push(
        attachTokensToHref(BL_CONFIG.blAdmin.basePath + "auth/gateway"),
      );
      return;
    }
    router.push("/" + (searchParams.get("redirect") ?? ""));
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
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          Logg inn
        </Typography>
        <FacebookButton label={"Logg inn med Facebook"} />
        <GoogleButton label={"Logg inn med Google"} />

        <Divider sx={{ width: "100%", mt: 3 }}>
          Eller, logg inn med e-post
        </Divider>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          {apiError && (
            <Alert severity="error" data-testid="api-error" sx={{ mt: 1 }}>
              {apiError}
            </Alert>
          )}
          {Object.entries(errors).map(([type, message]) => (
            <Alert
              key={type}
              severity="error"
              sx={{ mt: 1 }}
              data-testid="error-message"
            >
              {message.message}
            </Alert>
          ))}
          <TextField
            data-testid="email-field"
            inputProps={{
              inputMode: "email",
            }}
            required
            margin="normal"
            fullWidth
            id="email"
            label="E-post"
            autoComplete="email"
            {...register("email", {
              validate: (v) =>
                !v || isEmail(v) ? true : "Du må fylle inn en gyldig e-post",
            })}
          />
          <TextField
            data-testid="password-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
              ),
            }}
            required
            margin="normal"
            fullWidth
            label="Passord"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <Button
            data-testid="login-submit"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Logg inn
          </Button>
          <Grid container>
            <Grid item xs>
              <DynamicLink href={"/auth/forgot"}>Glemt passord?</DynamicLink>
            </Grid>
            <Grid item>
              <DynamicLink href={"/auth/register"}>
                Har du ikke konto? Registrer deg
              </DynamicLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
