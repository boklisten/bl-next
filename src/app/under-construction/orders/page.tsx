"use client";
import { Order } from "@boklisten/bl-model";
import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";

import { get } from "@/api/api";
import { getAccessTokenBody } from "@/api/token";
import OrderHistory from "@/components/OrderHistory";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const ordersUrl = `orders?customer=${details}&placed=true&sort=-creationTime`;
    const fetchDetails = async () => {
      const data = await get(ordersUrl);
      const orders = data.data.data as Order[];
      setOrders(orders);
    };
    fetchDetails();
  }, []);
  return (
    <>
      <title>Ordrehistorikk | Boklisten.no</title>
      <meta name="description" content="Se dine ordre" />
      <Card sx={{ paddingBottom: "2rem" }}>
        {orders && <OrderHistory orders={orders} />}
      </Card>
    </>
  );
};

export default OrdersPage;
