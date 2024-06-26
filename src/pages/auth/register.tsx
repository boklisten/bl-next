import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

import UserDetailEditor from "@/components/user/UserDetailEditor";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ny bruker | Boklisten.no</title>
        <meta
          name="description"
          content="Opprett en ny bruker for å tilgang til å bestille skolebøker."
        />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <UserDetailEditor isSignUp />
      </Card>
    </>
  );
};

export default Register;
