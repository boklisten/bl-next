import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import React, { ReactNode } from "react";

interface socialLoginProps {
  label: string;
  brandName: string;
  brandIcon: ReactNode;
  brandColor: string;
}

const SocialLoginButton = ({
  label,
  brandName,
  brandIcon,
  brandColor,
}: socialLoginProps) => (
  <Button
    data-testid={`${brandName}-button`}
    fullWidth
    variant="contained"
    sx={{
      mt: 1,
      padding: 2,
      background: brandColor,
      display: "flex",
      justifyContent: "left",
    }}
    startIcon={brandIcon}
    endIcon={<ChevronRightIcon />}
  >
    {label}
    <Box sx={{ flexGrow: 1 }}></Box>
  </Button>
);

export default SocialLoginButton;
