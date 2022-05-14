import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import isEmail from "validator/lib/isEmail";
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "api/login";
import { useRouter } from "next/router";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import DynamicLink from "../DynamicLink";

type SignInFields = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    setApiError("");
    try {
      await login(data.email, data.password);
      router.push("/" + (router.query?.["redirect"] ?? ""));
    } catch (error) {
      setApiError(String(error));
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
        <FacebookButton label={"Logg inn med Facebook"} />
        <GoogleButton label={"Logg inn med Google"} />

        <Divider sx={{ width: "100%", mt: 3 }}>
          Eller, logg inn med epost
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
            required
            margin="normal"
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <TextField
              data-testid="password-field"
              required
              margin="normal"
              fullWidth
              label="Passord"
              type={showPassword ? "text" : "password"}
              id="password"
              error={!!errors.password}
              autoComplete="current-password"
              {...register("password", { required: "Du må fylle inn passord" })}
            />
            <InputAdornment
              position="end"
              sx={{ position: "absolute", mr: 1, mt: 1 }}
            >
              <Tooltip title={showPassword ? "Skjul passord" : "Vis passord"}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          </Box>
          <Button
            data-testid="login-submit"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Object.entries(errors).length > 0}
          >
            Logg inn
          </Button>
          <Grid container>
            <Grid item xs>
              <DynamicLink
                href={"/auth/forgot"}
                label={"Glemt passord?"}
                testID={"forgot-password"}
              />
            </Grid>
            <Grid item>
              <DynamicLink
                href={"/auth/register"}
                label={"Har du ikke konto? Registrer deg"}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
