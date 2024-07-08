import { Metadata } from "next";
import { Suspense } from "react";

import UserSettings from "@/components/user/UserSettings";

export const metadata: Metadata = {
  title: "Brukerinnstillinger",
  description: "Endre din informasjon",
};

const SettingsPage = () => {
  return (
    <Suspense>
      <UserSettings />
    </Suspense>
  );
};

export default SettingsPage;
