"use client";
import { UserDetail } from "@boklisten/bl-model";
import { Alert, Button } from "@mui/material";
import { useState } from "react";

import { isEmployee, isLoggedIn } from "@/api/auth";
import DynamicLink from "@/components/DynamicLink";
import RapidHandoutDetails from "@/components/RapidHandoutDetails";
import UserDetailSearchField from "@/components/search/UserDetailSearchField";
import useIsHydrated from "@/utils/useIsHydrated";

export default function RapidHandout() {
  const hydrated = useIsHydrated();
  const [customer, setCustomer] = useState<UserDetail | null>(null);

  return hydrated && isLoggedIn() && isEmployee() ? (
    <>
      <UserDetailSearchField
        onSelectedResult={(userDetail) => {
          setCustomer(userDetail);
        }}
      />
      {customer && <RapidHandoutDetails customer={customer} />}
    </>
  ) : (
    <>
      <Alert sx={{ mt: 2 }} severity="info">
        Du må ha ansattilgang for å bruke denne siden.
      </Alert>
      <DynamicLink href={"/auth/login?redirect=admin/hurtigutdeling"}>
        <Button variant={"contained"} sx={{ mt: 2 }}>
          Logg inn
        </Button>
      </DynamicLink>
    </>
  );
}
