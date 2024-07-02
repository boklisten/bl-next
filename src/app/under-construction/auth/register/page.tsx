import { Card } from "@mui/material";
import { Metadata } from "next";

import UserDetailEditor from "@/components/user/UserDetailEditor";

export const metadata: Metadata = {
  title: "Ny bruker | Boklisten.no",
  description: "Opprett en ny bruker for å tilgang til å bestille skolebøker.",
};

const RegisterPage = () => {
  return (
    <>
      <Card sx={{ paddingBottom: "2rem" }}>
        <UserDetailEditor isSignUp />
      </Card>
    </>
  );
};

export default RegisterPage;
