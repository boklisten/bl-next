import { UserPermission } from "@boklisten/bl-model";
import {
  AccountCircle,
  Business,
  Checklist,
  ConnectWithoutContact,
  DocumentScanner,
  Email,
  Equalizer,
  LibraryBooks,
  Notifications,
  QrCode,
  Receipt,
  RequestQuote,
  Search,
  ShoppingCart,
  Storage,
  Storefront,
  SwitchAccessShortcut,
} from "@mui/icons-material";
import { Navigation } from "@toolpad/core";

const EMPLOYEE_LINKS: Navigation = [
  { title: "BL-ID-søk", icon: <Search />, segment: "admin/blid" },
  {
    title: "Handlekurv",
    icon: <ShoppingCart />,
    segment: "admin/handlekurv",
  },
  {
    title: "Hurtiginnsamling",
    icon: <QrCode />,
    segment: "admin/hurtiginnsamling",
  },
  {
    title: "Hurtigutdeling",
    icon: <Checklist />,
    segment: "admin/hurtigutdeling",
  },
  {
    title: "Ordreoversikt",
    icon: <Receipt />,
    segment: "admin/ordreoversikt",
  },
  { title: "Scanner", icon: <DocumentScanner />, segment: "admin/scanner" },
];

const ADMIN_LINKS: Navigation = [
  {
    title: "Faktura",
    icon: <RequestQuote />,
    segment: "admin/faktura",
  },
  {
    title: "Kommunikasjon",
    icon: <Email />,
    segment: "admin/kommunikasjon",
    children: [
      {
        title: "Påminnelser",
        icon: <Notifications />,
        segment: "paaminnelser",
      },
      {
        title: "Overleveringer",
        icon: <ConnectWithoutContact />,
        segment: "overleveringer",
      },
    ],
  },
  {
    title: "Databaseverktøy",
    icon: <Storage />,
    segment: "admin/database",
    children: [
      {
        title: "Rapporter",
        icon: <Equalizer />,
        segment: "rapporter",
      },
      {
        title: "Bøker",
        icon: <LibraryBooks />,
        segment: "boker",
      },
      {
        title: "Filialer",
        icon: <Storefront />,
        segment: "filialer",
      },
      {
        title: "Selskap",
        icon: <Business />,
        segment: "selskap",
      },
    ],
  },
];

const USER_LINKS: Navigation = [
  {
    title: "Profil",
    icon: <AccountCircle />,
    segment: "admin/profil",
  },
  {
    title: "Gå til Boklisten.no",
    icon: <SwitchAccessShortcut />,
  },
];

export function getAdminPagesNavigationLinks(userPermission: UserPermission) {
  return userPermission === "admin" || userPermission === "super"
    ? [...EMPLOYEE_LINKS, ...ADMIN_LINKS, ...USER_LINKS]
    : [...EMPLOYEE_LINKS, ...USER_LINKS];
}
