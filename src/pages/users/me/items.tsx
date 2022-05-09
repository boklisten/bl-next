import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { get } from "api/api";
import { getAccessTokenBody } from "api/token";
import { Branch, CustomerItem, Item } from "@boklisten/bl-model";
import CustomerItemOverview from "../../../components/CustomerItemOverview";
import { useAppSelector } from "../../../redux/hooks";
import { selectBranch } from "../../../redux/selectedBranch";
import { branchListUrl } from "../../../components/BranchSelect";
import { fetcher } from "../../../api/requests";

const Orders: NextPage = () => {
  const [customerItems, setCustomerItems] = useState<CustomerItem[]>();
  const [branchInfo, setBranchInfo] = useState<Branch>({} as Branch);
  const [branchNames, setBranchNames] = useState<Branch[]>([]);
  const selectedBranch = useAppSelector(selectBranch);

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const customerItemsUrl = `customerItems?customer=${details}&sort=-deadline`;
    const branchUrl = `branches/${selectedBranch.id}`;
    const fetchDetails = async () => {
      const branchData = await get(branchUrl);
      const branchNames: Branch[] = await fetcher(branchListUrl);
      setBranchNames(branchNames);
      setBranchInfo(branchData.data.data[0] as Branch);
      const data = await get(customerItemsUrl);
      const customerItems = data.data.data as CustomerItem[];
      const populatedCustomerItems = await Promise.all(
        customerItems.map(async (customerItem) => {
          const itemsUrl = `items/${customerItem.item}`;
          const data = await get(itemsUrl);
          customerItem.item = data.data.data[0] as Item;
          return customerItem;
        })
      );

      setCustomerItems(populatedCustomerItems);
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
        {customerItems && (
          <CustomerItemOverview
            customerItems={customerItems}
            branchInfo={branchInfo}
            branchNames={branchNames}
          />
        )}
      </Card>
    </>
  );
};

export default Orders;
