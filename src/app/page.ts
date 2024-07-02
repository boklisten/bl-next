import { redirect } from "next/navigation";

import BL_CONFIG from "@/utils/bl-config";

export default function IndexPage() {
  redirect(BL_CONFIG.blWeb.basePath);
}
