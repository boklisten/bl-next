import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { get } from "api/api";
import { getAccessTokenBody } from "api/token";
import OrderHistory from "../../../components/OrderHistory";
import { Order } from "@boklisten/bl-model";

const Register: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const userDetailUrl = `orders?customer=${details}&placed=true&sort=-creationTime`;
    const fetchDetails = async () => {
      const data = await get(userDetailUrl);
      const orders = data.data.data as Order[];
      setOrders(orders);
    };
    fetchDetails();
  }, []);
  return (
    <>
      <Head>
        <title>Ordrehistorikk | Boklisten.no</title>
        <meta name="description" content="Se dine ordre" />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        {orders && <OrderHistory orders={orders} />}
      </Card>
    </>
  );
};

export default Register;
