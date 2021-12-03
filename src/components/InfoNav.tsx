import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import {
  Divider,
  FormControl,
  InputLabel,
  NativeSelect,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";

interface LinkTabProps {
  label: string;
  href: string;
}

function NativeSelectWrapper({
  tabs,
  activeTabIndex,
}: {
  tabs: LinkTabProps[];
  activeTabIndex: number;
}) {
  const router = useRouter();

  useEffect(() => {
    for (const tab of tabs) {
      router.prefetch(tab.href);
    }
  }, [router, tabs]);

  const handleChange = (event: SelectChangeEvent) => {
    router.push(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginX: 10, marginY: 3 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Side
        </InputLabel>
        <NativeSelect
          value={tabs[activeTabIndex]?.href}
          onChange={handleChange as any}
          inputProps={{
            name: "page",
            id: "uncontrolled-native",
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.href} value={tab.href}>
              {tab.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
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

  // A hack to be able to use two rows of tabs
  const rowOneIndex = activeTabIndex < 4 ? activeTabIndex + 1 : 0;
  const rowTwoIndex = activeTabIndex >= 4 ? activeTabIndex - 3 : 0;

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", sm: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs value={rowOneIndex} aria-label="info page tabs row 1">
          <Tab label={"Hidden"} sx={{ display: "none" }} />
          {tabs.slice(0, 4).map((tab) => (
            <LinkTab key={tab.href} label={tab.label} href={tab.href} />
          ))}
        </Tabs>
        <Tabs value={rowTwoIndex} aria-label="info page tabs row 2">
          <Tab label={"Hidden"} sx={{ display: "none" }} />
          {tabs.slice(4).map((tab) => (
            <LinkTab key={tab.href} label={tab.label} href={tab.href} />
          ))}
        </Tabs>
        <Divider variant="middle" style={{ width: "95%" }} />
      </Box>
      <Box
        sx={{
          display: { sm: "flex", lg: "none" },
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NativeSelectWrapper tabs={tabs} activeTabIndex={activeTabIndex} />
      </Box>
    </>
  );
}
