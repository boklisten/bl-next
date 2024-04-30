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
              gap: "0.2rem",
            }
          : {}
      }
    >
      {finished && <CheckCircle color="success" sx={{ height: "1.3rem" }} />}
      {!finished && (
        <>
          <LinearProgress
            value={percentComplete}
            variant="determinate"
            sx={{
              marginBottom: "0.4rem",
              marginTop: "0.8rem",
              height: "0.5rem",
              borderRadius: "0.2rem",
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
