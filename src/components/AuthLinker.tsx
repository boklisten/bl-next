"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { isLoggedIn } from "@/api/auth";
import {
  addAccessToken,
  addRefreshToken,
  getAccessToken,
  getRefreshToken,
} from "@/api/token";
import BL_CONFIG from "@/utils/bl-config";

export function attachTokensToHref(href: string) {
  if (
    (String(href).includes(BL_CONFIG.blWeb.basePath) ||
      String(href).includes(BL_CONFIG.blAdmin.basePath)) &&
    isLoggedIn()
  ) {
    return (
      href +
      `?refresh_token=${getRefreshToken()}&access_token=${getAccessToken()}`
    );
  }
  return href;
}

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
