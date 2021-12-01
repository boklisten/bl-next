import { Typography } from "@mui/material";
import type { NextPage } from "next";
import Counter from "../src/components/Counter";

const Home: NextPage = () => {
  return (
    <div>
      <Typography variant="h1">I am a title</Typography>
      <Counter></Counter>
    </div>
  );
};

export default Home;
