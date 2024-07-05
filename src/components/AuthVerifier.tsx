"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { get } from "@/api/api";
import { isLoggedIn } from "@/api/auth";
import { getAccessTokenBody } from "@/api/token";
import BL_CONFIG from "@/utils/bl-config";

export default function AuthVerifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    // Wait for AuthLinker
    if (searchParams.size > 0) {
      return;
    }
    if (!isLoggedIn()) {
      router.push("/auth/failure");
    }
    const { details } = getAccessTokenBody();
    const checkUserDetailsValid = async () => {
      try {
        const response = await get(
          `${BL_CONFIG.collection.userDetail}/${details}/valid`,
        );
        const isValid = response.data.data[0]?.valid;
        if (isValid) {
          router.push("/");
        } else {
          router.push("/settings");
        }
      } catch {
        router.push("/auth/failure");
      }
    };
    checkUserDetailsValid();
  }, [router, searchParams.size]);
  return null;
}
