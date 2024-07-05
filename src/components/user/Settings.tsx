"use client";
import { UserDetail } from "@boklisten/bl-model";
import { Card, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import BlFetcher from "@/api/blFetcher";
import { getAccessTokenBody } from "@/api/token";
import UserDetailEditor from "@/components/user/UserDetailEditor";
import BL_CONFIG from "@/utils/bl-config";

const Settings = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetail>();

  useEffect(() => {
    // Wait for AuthLinker to process query params
    if (searchParams.size > 0) {
      return;
    }

    try {
      const { details } = getAccessTokenBody();
      const fetchDetails = async () => {
        const userDetails = await BlFetcher.get<[UserDetail]>(
          `${BL_CONFIG.collection.userDetail}/${details}`,
        );
        setUserDetails(userDetails[0]);
      };
      fetchDetails();
    } catch {
      router.push("/auth/login?redirect=settings");
    }
  }, [router, searchParams]);

  return (
    <Card sx={{ paddingBottom: "2rem" }}>
      {!userDetails && (
        <Box
          sx={{
            marginTop: 4,
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
            Innstillinger
          </Typography>
          <CircularProgress sx={{ mt: 1 }} />
        </Box>
      )}
      {userDetails && <UserDetailEditor userDetails={userDetails} />}
    </Card>
  );
};

export default Settings;
