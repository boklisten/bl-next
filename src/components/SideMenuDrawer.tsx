import React, { useState, KeyboardEvent, MouseEvent, ReactNode } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, ListItemButton } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { isLoggedIn, logout } from "api/auth";

interface DrawerLinkProps {
  title: string;
  href: string;
  icon: ReactNode;
  onClick?: () => void;
}

const DrawerLink = ({ title, href, icon, onClick }: DrawerLinkProps) => (
  <Link href={href} passHref>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  </Link>
);

export default function SideMenuDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <>
      <IconButton sx={{ color: "white" }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <DrawerLink
              title={"Bestill b??ker"}
              href={"/order"}
              icon={<BookIcon />}
            />

            {isLoggedIn() && (
              <>
                <DrawerLink
                  title={"Dine b??ker"}
                  href={"/users/me/items"}
                  icon={<MenuBookIcon />}
                />
                <DrawerLink
                  title={"Ordrehistorikk"}
                  href={"/users/me/orders"}
                  icon={<ReceiptIcon />}
                />
              </>
            )}
            <Divider />

            <DrawerLink
              title={"??pningstider"}
              href={"/info/branch/select"}
              icon={<AccessTimeIcon />}
            />
            <DrawerLink
              title={"Generell informasjon"}
              href={"/info/general"}
              icon={<InfoIcon />}
            />
            <DrawerLink
              title={"Kontaktinformasjon"}
              href={"/info/contact"}
              icon={<EmailIcon />}
            />

            <Divider />

            {isLoggedIn() && (
              <>
                <DrawerLink
                  title={"Brukerinnstillinger"}
                  href={"/users/me/settings"}
                  icon={<SettingsIcon />}
                />
                <DrawerLink
                  title={"Logg ut"}
                  href={"/"}
                  icon={<LogoutIcon />}
                  onClick={logout}
                />
              </>
            )}

            {!isLoggedIn() && (
              <>
                <DrawerLink
                  title={"Registrer"}
                  href={"/auth/register"}
                  icon={<PersonAddIcon />}
                />
                <DrawerLink
                  title={"Logg inn"}
                  href={"/auth/login"}
                  icon={<LoginIcon />}
                />
              </>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
