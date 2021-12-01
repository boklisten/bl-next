import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import ConstructionIcon from "@mui/icons-material/Construction";

const Home: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
      }}
    >
      <ConstructionIcon color="warning" fontSize="large" />
      <Typography variant="h4" sx={{ margin: 5 }}>
        Her kommer nye Boklisten.no!
      </Typography>
      <ConstructionIcon color="warning" fontSize="large" />
    </Box>
  );
};

export default Home;
