"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { isLoggedIn } from "@/api/auth";
import BlFetcher from "@/api/blFetcher";
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
        const [{ valid }] = await BlFetcher.get<[{ valid: boolean }]>(
          `${BL_CONFIG.collection.userDetail}/${details}/valid`,
        );
        if (valid) {
          router.push("/");
        } else {
          router.push("/user-settings");
        }
      } catch {
        router.push("/auth/failure");
      }
    };
    checkUserDetailsValid();
  }, [router, searchParams.size]);
  return null;
}
