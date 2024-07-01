"use client";
import { Branch, OpeningHour } from "@boklisten/bl-model";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import BranchSelect from "@/components/BranchSelect";
import BranchInfo from "@/components/info/BranchInfo";
import DynamicNav from "@/components/info/DynamicNav";
import { infoPageTabs } from "@/utils/constants";
import { useGlobalState } from "@/utils/useGlobalState";

function LinkableBranchInfo({
  branch,
  openingHours,
}: {
  branch: Branch | null;
  openingHours: OpeningHour[];
}) {
  const router = useRouter();
  const { selectedBranchId } = useGlobalState();

  useEffect(() => {
    if (branch === null && selectedBranchId) {
      return router.push(`/info/branch/${selectedBranchId}`);
    }
  }, [branch, router, selectedBranchId]);

  return (
    <>
      <Card>
        <DynamicNav tabs={infoPageTabs} twoRows />
        {branch === null && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
            >
              Velg din skole
            </Typography>
            <BranchSelect />
          </Box>
        )}
        {branch?.name && (
          <BranchInfo branch={branch} openingHours={openingHours} />
        )}
      </Card>
    </>
  );
}

export default LinkableBranchInfo;
