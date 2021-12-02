import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { Divider } from "@mui/material";

interface LinkTabProps {
  label: string;
  href: string;
}

function LinkTab({ label, href }: LinkTabProps) {
  return (
    <Link href={href} passHref>
      <Tab component="a" label={label} />
    </Link>
  );
}

export default function NavTabs() {
  const router = useRouter();

  const tabs: LinkTabProps[] = [
    { label: "Generell informasjon", href: "/info/general" },
    { label: "Spørsmål og svar", href: "/info/faq" },
    { label: "For VGS-elever", href: "/info/pupils" },
    { label: "Skoler og åpningstider", href: "/info/branch" },
    { label: "Avtaler og betingelser", href: "/info/policies" },
    { label: "Om oss", href: "/info/about" },
    { label: "For skolekunder", href: "/info/companies" },
    { label: "Innkjøpsliste", href: "/info/buyback" },
    { label: "Kontakt oss", href: "/info/contact" },
  ];
  const activeTabIndex =
    tabs.findIndex((tab) => router.route.includes(tab.href)) ?? 0;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Tabs value={activeTabIndex} aria-label="info page tabs row 1">
        {tabs.slice(0, 4).map((tab) => (
          <LinkTab key={tab.href} label={tab.label} href={tab.href} />
        ))}
      </Tabs>
      <Tabs value={activeTabIndex - 4} aria-label="info page tabs row 2">
        {tabs.slice(4, 8).map((tab) => (
          <LinkTab key={tab.href} label={tab.label} href={tab.href} />
        ))}
      </Tabs>
      <Divider variant="middle" style={{ width: "95%" }} />
    </Box>
  );
}
