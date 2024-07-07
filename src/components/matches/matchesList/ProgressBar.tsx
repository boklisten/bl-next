import { CheckCircle } from "@mui/icons-material";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import React, { ReactElement } from "react";

import theme from "@/utils/theme";

const ProgressBar: React.FC<{
  percentComplete: number;
  subtitle?: ReactElement;
}> = ({ percentComplete, subtitle }) => {
  const finished = percentComplete >= 100;
  return (
    <Box
      sx={
        finished
          ? {
              display: "flex",
              flexDirection: "row",
              placeItems: "center",
              gap: 0.4,
              marginBottom: 1,
            }
          : {
              marginBottom: 1,
            }
      }
    >
      {finished && <CheckCircle color="success" sx={{ height: 2.6 }} />}
      {!finished && (
        <>
          <LinearProgress
            value={percentComplete}
            variant="determinate"
            sx={{
              marginBottom: 0.8,
              marginTop: 1.6,
              height: 1,
              borderRadius: 0.4,
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor:
                  theme.palette.grey[
                    theme.palette.mode === "light" ? 300 : 700
                  ],
              },
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.success.main,
              },
            }}
          />
          {subtitle}
        </>
      )}
      {subtitle && finished && <Box>{subtitle}</Box>}
    </Box>
  );
};

export default ProgressBar;
