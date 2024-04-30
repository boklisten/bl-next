import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import SignIn from "@/components/user/SignIn";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Logg inn | Boklisten.no</title>
        <meta
          name="description"
          content="Logg inn for bestille bøker, samt se status på nåvårende bøker."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <SignIn />
      </Card>
    </>
  );
};

export default Login;
