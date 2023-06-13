import { useRouter } from "next/router";
import { useEffect } from "react";
import { addAccessToken, addRefreshToken } from "../api/token";

function MyDeliverables() {
  const router = useRouter();

  useEffect(() => {
    const { refresh_token, access_token } = router.query;

    if (typeof refresh_token === "string" && typeof access_token === "string") {
      addAccessToken(access_token);
      addRefreshToken(refresh_token);
      router.replace("/overleveringer", undefined, { shallow: true });
    }
  }, [router]);

  return <p>dummy text</p>;
}

export default MyDeliverables;
