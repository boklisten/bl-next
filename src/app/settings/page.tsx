import { Metadata } from "next";
import { Suspense } from "react";

import Settings from "@/components/user/Settings";

export const metadata: Metadata = {
  title: "Innstillinger | Boklisten.no",
  description: "Endre din informasjon",
};

const SettingsPage = () => {
  return (
    <Suspense>
      <Settings />
    </Suspense>
  );
};

export default SettingsPage;
