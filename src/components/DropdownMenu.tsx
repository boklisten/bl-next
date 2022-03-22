import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
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

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href="/order" passHref>
          <ListItem button>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={"Bestill bøker"} />
          </ListItem>
        </Link>

        {isLoggedIn() && (
          <>
            <Link href="/users/me/items" passHref>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={"Dine bøker"} />
              </ListItem>
            </Link>

            <Link href="/users/me/orders" passHref>
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={"Ordrehistorikk"} />
              </ListItem>
            </Link>
          </>
        )}
        <Divider />

        <Link href="/info/branch/select" passHref>
          <ListItem button>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary={"Åpningstider"} />
          </ListItem>
        </Link>

        <Link href="/info/general" passHref>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"Generell informasjon"} />
          </ListItem>
        </Link>

        <Link href="/info/contact" passHref>
          <ListItem button>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={"Kontaktinformasjon"} />
          </ListItem>
        </Link>

        <Divider />

        {isLoggedIn() && (
          <>
            <Link href="/users/me/settings" passHref>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Brukerinnstillinger"} />
              </ListItem>
            </Link>

            <Link href="/" passHref>
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logg ut"} />
              </ListItem>
            </Link>
          </>
        )}

        {!isLoggedIn() && (
          <>
            <Link href="/auth/register" passHref>
              <ListItem button>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Registrer"} />
              </ListItem>
            </Link>

            <Link href="/auth/login" passHref data-testid="dropdown-login-link">
              <ListItem button>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Logg inn"} />
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  );

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
        {list()}
      </SwipeableDrawer>
    </>
  );
}
