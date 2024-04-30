import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import React from "react";

import SocialLoginButton from "@/components/user/SocialLoginButton";

const FacebookButton = ({ label }: { label: string }) => (
  <SocialLoginButton
    label={label}
    brandName={"facebook"}
    brandIcon={<FacebookRoundedIcon />}
    brandColor={"#1877F2"}
  />
);

export default FacebookButton;
