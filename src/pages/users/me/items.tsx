import { Branch, CustomerItem, Item } from "@boklisten/bl-model";
import { Card, Container, Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { get } from "@/api/api";
import { fetcher } from "@/api/requests";
import { getAccessTokenBody } from "@/api/token";
import { branchListUrl } from "@/components/BranchSelect";
import CustomerItemOverview from "@/components/CustomerItemOverview";
import { useAppSelector } from "@/redux/hooks";
import { selectBranch } from "@/redux/selectedBranch";

const Orders: NextPage = () => {
  const [customerItems, setCustomerItems] = useState<CustomerItem[]>();
  const [branchInfo, setBranchInfo] = useState<Branch>({} as Branch);
  const [branchNames, setBranchNames] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedBranch = useAppSelector(selectBranch);

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const customerItemsUrl = `customerItems?customer=${details}&sort=-deadline`;
    const branchUrl = `branches/${selectedBranch.id}`;
    const fetchDetails = async () => {
      const [branchData, branchNames, data] = await Promise.all([
        get(branchUrl),
        fetcher(branchListUrl),
        get(customerItemsUrl),
      ]);
      const customerItems = data.data.data as CustomerItem[];
      const populatedCustomerItems = await Promise.all(
        customerItems.map(async (customerItem) => {
          const data = await get(`items/${customerItem.item}`);
          customerItem.item = data.data.data[0] as Item;
          return customerItem;
        }),
      );

      setBranchNames(branchNames);
      setBranchInfo(branchData.data.data[0] as Branch);
      setCustomerItems(populatedCustomerItems);
      setLoading(false);
    };
    fetchDetails();
  }, [selectedBranch.id]);
  return (
    <>
      <Head>
        <title>Dine bøker | Boklisten.no</title>
        <meta name="description" content="Se dine bøker" />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
          >
            Mine bøker
          </Typography>
          {loading && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              {[0, 1].map((number) => (
                <Skeleton
                  key={`skeleton-${number}`}
                  variant="rectangular"
                  width="400px"
                  height="250px"
                  animation="wave"
                />
              ))}
            </Box>
          )}
          {!loading && customerItems && (
            <CustomerItemOverview
              customerItems={customerItems}
              branchInfo={branchInfo}
              branchNames={branchNames}
            />
          )}
        </Container>
      </Card>
    </>
  );
};

export default Orders;
