"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

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
    (href.includes(BL_CONFIG.blWeb.basePath) ||
      href.includes(BL_CONFIG.blAdmin.basePath)) &&
    isLoggedIn()
  ) {
    return (
      href +
      `?refresh_token=${getRefreshToken()}&access_token=${getAccessToken()}`
    );
  }
  return href;
}

export function executeReturnRedirect(
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) {
  const caller = searchParams.get("caller");
  const baseUrl =
    caller === "bl-web"
      ? BL_CONFIG.blWeb.basePath
      : caller === "bl-admin"
        ? BL_CONFIG.blAdmin.basePath
        : "/";
  const path =
    caller == "bl-admin" ? "auth/gateway" : searchParams.get("redirect") ?? "";
  router.replace(attachTokensToHref(baseUrl + path));
}

export default function AuthLinker({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParameters = useSearchParams();
  const [authProcessed, setAuthProcessed] = useState(false);

  useEffect(() => {
    const refresh_token = searchParameters.get("refresh_token");
    const access_token = searchParameters.get("access_token");

    if (refresh_token && access_token) {
      addAccessToken(access_token);
      addRefreshToken(refresh_token);
      // Clear tokens from search params
      const params = new URLSearchParams(searchParameters.toString());
      params.delete("refresh_token");
      params.delete("access_token");
      router.replace(pathname + "?" + params);
    }
    setAuthProcessed(true);
  }, [pathname, router, searchParameters]);

  if (!authProcessed) {
    return null;
  }
  return <>{children}</>;
}
