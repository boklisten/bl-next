import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { get } from "api/api";
import { BranchItem } from "@boklisten/bl-model";
import { useAppSelector } from "../redux/hooks";
import { selectBranch } from "../redux/selectedBranch";
import BranchSelect from "../components/BranchSelect";
import Typography from "@mui/material/Typography";
import SubjectSelect from "../components/SubjectSelect";

const Orders: NextPage = () => {
  const selectedBranch = useAppSelector(selectBranch);
  const [branchItems, setBranchItems] = useState<BranchItem[]>();

  useEffect(() => {
    const branchItemsUrl = `branchitems?branch=${selectedBranch.id}`;
    const fetchDetails = async () => {
      const data = await get(branchItemsUrl);
      const branchItems = data.data.data as BranchItem[];
      setBranchItems(branchItems);
    };
    if (selectedBranch.id.length > 0) {
      fetchDetails();
    }
  }, [selectedBranch]);
  return (
    <>
      <Head>
        <title>Bestill bøker | Boklisten.no</title>
        <meta name="description" content="Bestill bøkene du trenger." />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
        >
          {selectedBranch.id.length === 0 ? "Velg din skole" : "Velg fag"}
        </Typography>
        {selectedBranch.id.length === 0 && <BranchSelect />}
        {branchItems && <SubjectSelect branchItems={branchItems} />}
      </Card>
    </>
  );
};

export default Orders;
