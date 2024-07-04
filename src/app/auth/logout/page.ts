"use client";
import { redirect } from "next/navigation";

import { logout } from "@/api/auth";
import { attachTokensToHref } from "@/components/AuthLinker";
import BL_CONFIG from "@/utils/bl-config";

export default function LogoutPage() {
  logout();
  redirect(attachTokensToHref(BL_CONFIG.blWeb.basePath + "logout"));
}
