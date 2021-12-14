import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Alert,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

type ForgotFields = {
  email: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFields>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<ForgotFields> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Logg inn | Boklisten.no</title>
        <meta
          name="description"
          content="Har du glemt passordet ditt? Få hjep til å opprette et nytt!"
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
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
              Glemt passord
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Skriv inn din e-postadresse, så sender vi deg en lenke slik at du
              kan nullstille passordet ditt.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
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
              <Button
                data-testid="forgot-submit"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={Object.entries(errors).length > 0}
              >
                Reset passord
              </Button>
              <Grid container>
                <Grid item>
                  <NextLink href="/auth/login" passHref>
                    <Link variant="body2" data-testid="login">
                      Tilbake til innloggingssiden
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Card>
    </>
  );
};

export default Login;
