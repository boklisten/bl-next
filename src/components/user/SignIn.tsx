import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import isEmail from "validator/lib/isEmail";
import { Alert, Divider, IconButton, InputAdornment } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NextLink from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type SignInFields = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<SignInFields> = (data) => {
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(errors).map(([type, message]) => (
            <Alert key={type} severity="error" data-testid="error-message">
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
            error={errors.email ? true : false}
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
              error={errors.password ? true : false}
              autoComplete="current-password"
              {...register("password", { required: "Du må fylle inn passord" })}
            />
            <InputAdornment position="end" sx={{ position: "absolute", mr: 1 }}>
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
