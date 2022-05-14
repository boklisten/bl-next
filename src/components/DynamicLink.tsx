import NextLink from "next/link";
import { Link } from "@mui/material";
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
  <NextLink href={href} passHref>
    <Link
      variant="body2"
      underline={underline}
      data-testid={testID}
      target={target}
    >
      {label}
    </Link>
  </NextLink>
);

export default DynamicLink;
