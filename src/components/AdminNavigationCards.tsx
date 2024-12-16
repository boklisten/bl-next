"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { Navigation, NavigationPageItem } from "@toolpad/core";
import { useEffect, useState } from "react";

import { getUserPermission } from "@/api/auth";
import DynamicLink from "@/components/DynamicLink";
import { getAdminPagesNavigationLinks } from "@/utils/adminPageNavigation";

export default function AdminNavigationCards() {
  const [navLinks, setNavLinks] = useState<Navigation>([]);
  useEffect(() => {
    const userPermission = getUserPermission();
    setNavLinks(getAdminPagesNavigationLinks(userPermission));
  }, []);

  return (
    <Grid2 container spacing={2} sx={{ justifyContent: "center", mt: 5 }}>
      {navLinks
        .filter(
          (navLink): navLink is NavigationPageItem => navLink.kind === "page",
        )
        .map((navLink) => (
          <Grid2 key={navLink.title}>
            <Card sx={{ width: 170 }}>
              <DynamicLink
                href={`/${navLink.segment ?? ""}`}
                sx={{ color: "inherit" }}
              >
                <CardActionArea>
                  <CardContent>
                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      {navLink.icon}
                      <Typography>{navLink.title}</Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </DynamicLink>
            </Card>
          </Grid2>
        ))}
    </Grid2>
  );
}
