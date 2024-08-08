"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { isLoggedIn } from "@/api/auth";
import BlFetcher from "@/api/blFetcher";
import { getAccessTokenBody } from "@/api/token";
import BL_CONFIG from "@/utils/bl-config";

export default function AuthVerifier() {
  const router = useRouter();
  useEffect(() => {
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
  }, [router]);
  return null;
}
