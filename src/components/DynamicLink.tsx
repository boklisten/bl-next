import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

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

const DynamicLink = ({ href, testID, ...props }: DynamicLinkProps) => (
  <MuiLink
    {...props}
    component={CustomNextLink}
    _href={href}
    data-testid={testID}
    variant={props.variant ?? "body2"}
    underline={props.underline ?? "none"}
  />
);

export default DynamicLink;
