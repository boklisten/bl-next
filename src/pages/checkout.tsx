import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "@mui/material";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCartItems, setOrderID } from "../redux/cart";
import { add } from "../api/api";
import { createOrder } from "../utils/cartUtils";
import { selectBranch } from "../redux/selectedBranch";
import { Order } from "@boklisten/bl-model";
import { useRouter } from "next/router";

const CartPage: NextPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const selectedBranch = useAppSelector(selectBranch);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
      return;
    }
    const fetchOrder = async () => {
      const createdOrder: Order = await add(
        "orders",
        createOrder(selectedBranch.id, cartItems)
      ).then((response) => response.data.data[0]);
      dispatch(setOrderID(createdOrder.id));
    };
    fetchOrder();
  }, [cartItems, dispatch, router, selectedBranch.id]);
  return (
    <>
      <Head>
        <title>Til betaling | Boklisten.no</title>
        <meta name="description" content="Til betaling" />
      </Head>
      <Card sx={{ paddingBottom: "2rem", paddingTop: "1rem" }}>
        <CheckoutStepper steps={["tos", "delivery", "payment"]} />
      </Card>
    </>
  );
};

export default CartPage;
