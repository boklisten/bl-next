import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { isLoggedIn } from "../api/auth";
import { getAccessToken, getRefreshToken } from "../api/token";
import BL_CONFIG from "../utils/bl-config";
import { useEffect, useState } from "react";

type CustomNextLinkProps = Omit<NextLinkProps, "href"> & {
  _href: NextLinkProps["href"];
};

const CustomNextLink = ({ _href, ...props }: CustomNextLinkProps) => (
  <NextLink href={_href} {...props} />
);

// combine MUI LinkProps with NextLinkProps
// remove both href properties
// and define a new href property using NextLinkProps
type DynamicLinkProps = Omit<MuiLinkProps<typeof NextLink>, "href"> & {
  href: NextLinkProps["href"];
  testID?: string;
};

const DynamicLink = ({ href, testID, ...props }: DynamicLinkProps) => {
  // Since we do not have token info while on the server side, we need to wait until we are on the client side to set the href
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (String(href).includes(BL_CONFIG.blWeb.basePath) && isLoggedIn()) {
    href += `?refresh_token=${getRefreshToken()}&access_token=${getAccessToken()}`;
  }

  return (
    <MuiLink
      {...props}
      component={CustomNextLink}
      _href={hydrated ? href : ""}
      data-testid={testID}
      variant={props.variant ?? "body2"}
      underline={props.underline ?? "none"}
    />
  );
};

export default DynamicLink;
