import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import DropDownMenu from "./DropdownMenu";
import BranchSelect from "./BranchSelect";

export default function NavBar() {
  return (
    <Box data-testid="nav-bar">
      <AppBar position="fixed">
        <Toolbar sx={{ paddingY: "10px" }}>
          <Link href="/" passHref>
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
                  display: { xs: "none", md: "flex" },
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
              data-testid="infoBtnNav"
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

          <Link href="/order" passHref>
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

          <BranchSelect isNav />

          <DropDownMenu />
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ marginBottom: "10px" }} />
    </Box>
  );
}
