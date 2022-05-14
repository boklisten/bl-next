import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import SocialLoginButton from "./SocialLoginButton";

const GoogleButton = ({ label }: { label: string }) => (
  <SocialLoginButton
    label={label}
    brandName={"google"}
    brandIcon={<GoogleIcon />}
    brandColor={"#ea4335"}
  />
);

export default GoogleButton;
