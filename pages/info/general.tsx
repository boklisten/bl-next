import { Card } from "@mui/material";
import Editor from "../../src/components/Editor";
import type { NextPage } from "next";
import InfoNav from "../../src/components/InfoNav";

const General: NextPage = () => {
  return (
    <Card>
      <InfoNav />
      <Editor />
    </Card>
  );
};

export default General;
