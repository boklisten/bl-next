"use client";
import { UserDetail } from "@boklisten/bl-model";
import { Card, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import BlFetcher from "@/api/blFetcher";
import { getAccessTokenBody } from "@/api/token";
import UserDetailEditor from "@/components/user/user-detail-editor/UserDetailEditor";
import BL_CONFIG from "@/utils/bl-config";

const UserSettings = () => {
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
        const [userDetails] = await BlFetcher.get<[UserDetail]>(
          `${BL_CONFIG.collection.userDetail}/${details}`,
        );
        setUserDetails(userDetails);
      };
      fetchDetails();
    } catch {
      router.push("/auth/login?redirect=settings");
    }
  }, [router, searchParams]);

  return (
    <Card sx={{ paddingBottom: 4 }}>
      {!userDetails && (
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ mt: 1 }}>
            Brukerinnstillinger
          </Typography>
          <CircularProgress sx={{ mt: 1 }} />
        </Box>
      )}
      {userDetails && <UserDetailEditor userDetails={userDetails} />}
    </Card>
  );
};

export default UserSettings;
