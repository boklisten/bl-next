import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { get } from "@/api/api";
import { getAccessTokenBody } from "@/api/token";
import UserDetailEditor from "@/components/user/UserDetailEditor";

const Register: NextPage = () => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const userDetailUrl = `userdetails/${details}`;
    const fetchDetails = async () => {
      const data = await get(userDetailUrl);
      setUserDetails(data.data.data[0]);
    };
    fetchDetails();
  }, []);
  return (
    <>
      <Head>
        <title>Innstillinger | Boklisten.no</title>
        <meta name="description" content="Endre din informasjon" />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        {!userDetails && <UserDetailEditor />}
        {userDetails && <UserDetailEditor userDetails={userDetails} />}
      </Card>
    </>
  );
};

export default Register;
