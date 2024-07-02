"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { addAccessToken, addRefreshToken } from "@/api/token";

export default function AuthLinker() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParameters = useSearchParams();

  useEffect(() => {
    const refresh_token = searchParameters.get("refresh_token");
    const access_token = searchParameters.get("access_token");

    if (refresh_token && access_token) {
      addAccessToken(access_token);
      addRefreshToken(refresh_token);
      // Clear search params
      router.replace(pathname);
    }
  }, [pathname, router, searchParameters]);
  return null;
}
