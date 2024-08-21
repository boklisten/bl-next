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
    const url = new URL(href);
    url.searchParams.append("refresh_token", getRefreshToken());
    url.searchParams.append("access_token", getAccessToken());
    return url.toString();
  }
  return href;
}

export function executeReturnRedirect(
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) {
  let target = "";

  const caller = searchParams.get("caller");
  const redirect = searchParams.get("redirect");
  if (caller === "bl-web") {
    target = `${BL_CONFIG.blWeb.basePath}auth/gateway?redirect=${redirect}`;
  } else if (caller === "bl-admin") {
    target = `${BL_CONFIG.blAdmin.basePath}auth/gateway`;
  } else {
    target = `/${redirect ?? ""}`;
  }
  router.replace(attachTokensToHref(target));
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
