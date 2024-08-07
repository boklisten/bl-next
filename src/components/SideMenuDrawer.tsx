"use client";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookIcon from "@mui/icons-material/Book";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useRouter } from "next/navigation";
import React, { useState, KeyboardEvent, MouseEvent, ReactNode } from "react";

import { isLoggedIn, logout } from "@/api/auth";
import DynamicLink from "@/components/DynamicLink";
import BL_CONFIG from "@/utils/bl-config";

interface DrawerLinkProps {
  title: string;
  href: string;
  icon: ReactNode;
  onClick?: () => void;
}

const DrawerLink = ({ title, href, icon, onClick }: DrawerLinkProps) => (
  <DynamicLink href={href} style={{ color: "inherit" }}>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  </DynamicLink>
);

export default function SideMenuDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
              title={"Bestill bøker"}
              href={BL_CONFIG.blWeb.basePath + "fastbuy/regions"}
              icon={<BookIcon />}
            />

            {isLoggedIn() && (
              <>
                <DrawerLink
                  title={"Dine bøker"}
                  href={BL_CONFIG.blWeb.basePath + "u/items"}
                  icon={<MenuBookIcon />}
                />
                <DrawerLink
                  title={"Ordrehistorikk"}
                  href={BL_CONFIG.blWeb.basePath + "u/order"}
                  icon={<ReceiptIcon />}
                />
              </>
            )}
            <Divider />

            <DrawerLink
              title={"Åpningstider"}
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
                  href={BL_CONFIG.blWeb.basePath + "u/edit"}
                  icon={<SettingsIcon />}
                />
                <DrawerLink
                  title={"Logg ut"}
                  href={""}
                  icon={<LogoutIcon />}
                  onClick={() => {
                    logout();
                    router.push(BL_CONFIG.blWeb.basePath + "auth/logout");
                  }}
                />
              </>
            )}

            {!isLoggedIn() && (
              <>
                <DrawerLink
                  title={"Registrer"}
                  href={BL_CONFIG.blWeb.basePath + "auth/register"}
                  icon={<PersonAddIcon />}
                />
                <DrawerLink
                  title={"Logg inn"}
                  href={BL_CONFIG.blWeb.basePath + "auth/login"}
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
