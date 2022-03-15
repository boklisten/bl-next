import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { get } from "api/api";
import { getAccessTokenBody } from "api/token";
import { CustomerItem, Item } from "@boklisten/bl-model";
import CustomerItemOverview from "../../../components/CustomerItemOverview";

const Orders: NextPage = () => {
  const [customerItems, setCustomerItems] = useState<CustomerItem[]>();

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const customerItemsUrl = `customerItems?customer=${details}&sort=-creationTime`;
    const fetchDetails = async () => {
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
  }, []);
  return (
    <>
      <Head>
        <title>Dine bøker | Boklisten.no</title>
        <meta name="description" content="Se dine bøker" />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        {customerItems && (
          <CustomerItemOverview customerItems={customerItems} />
        )}
      </Card>
    </>
  );
};

export default Orders;
