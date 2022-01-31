import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import UserDetailEditor from "components/user/UserDetailEditor";
import type { NextPage } from "next";
import Head from "next/head";
import { get } from "api/api";
import { getAccessTokenBody } from "api/token";

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
  console.log(userDetails);
  return (
    <>
      <Head>
        <title>Innstillinger | Boklisten.no</title>
        <meta name="description" content="Endre din informasjon" />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        {userDetails && <UserDetailEditor userDetails={userDetails} />}
      </Card>
    </>
  );
};

export default Register;
