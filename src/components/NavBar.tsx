import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  return (
    <Box data-testid="nav-bar">
      <AppBar position="fixed">
        <Toolbar>
          <Link href="https://www.boklisten.no/welcome" passHref>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              color="secondary"
            >
              <Image
                src="/boklisten_logo_v2_icon_white_lg.png"
                width={40}
                height={40}
                alt="logo"
              />
              <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{
                  flexGrow: 1,
                  marginLeft: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                Boklisten.no
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Link href="https://www.boklisten.no/info/general" passHref>
            <Button
              sx={{
                display: "flex",
                color: "white",
                alignItems: "center",
                cursor: "pointer",
              }}
              color="secondary"
            >
              Info
            </Button>
          </Link>

          <Link href="https://www.boklisten.no/fastbuy/regions" passHref>
            <Button
              sx={{
                display: "flex",
                color: "white",
                alignItems: "center",
                cursor: "pointer",
              }}
              color="secondary"
            >
              Bestill bøker
            </Button>
          </Link>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
