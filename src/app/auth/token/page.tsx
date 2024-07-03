"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TokenRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    // Redirect after tokens have been captured
    setTimeout(() => {
      router.push("/");
    }, 100);
  }, [router]);
  return null;
}
