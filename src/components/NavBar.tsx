import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import DropDownMenu from "./DropdownMenu";

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
                }}
              >
                Boklisten.no
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Link href="/info/general" passHref>
            <Button
              sx={{
                display: { xs: "none", md: "flex" },
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
                display: { xs: "none", md: "flex" },
                color: "white",
                alignItems: "center",
                cursor: "pointer",
              }}
              color="secondary"
            >
              Bestill bøker
            </Button>
          </Link>

          <DropDownMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
