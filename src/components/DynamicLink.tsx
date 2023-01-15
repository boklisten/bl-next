import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";
import React, { HTMLAttributeAnchorTarget } from "react";

interface LinkProps {
  href: string;
  label: string;
  underline?: "none" | "hover" | "always";
  testID?: string;
  target?: HTMLAttributeAnchorTarget;
}

const DynamicLink = ({
  href,
  label,
  target,
  underline = "always",
  testID,
}: LinkProps) => (
  <MuiLink
    component={NextLink}
    href={href}
    variant="body2"
    underline={underline}
    data-testid={testID}
    target={target}
  >
    {label}
  </MuiLink>
);

export default DynamicLink;
