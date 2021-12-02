import { Box } from "@mui/material";
import type { NextPage } from "next";
import InfoNav from "../../components/InfoNav";
import Head from "next/head";

const Policies: NextPage = () => {
  return (
    <>
      <Head>
        <title>Avtaler og betingelser | Boklisten.no</title>
        <meta
          name="description"
          content="Vi tar personvern og kundebehandling på alvor. Les våre oppdaterte vilkår og betingelser, samt personvernavtale."
        />
      </Head>
      <Box>
        <InfoNav />
      </Box>
    </>
  );
};

export default Policies;
