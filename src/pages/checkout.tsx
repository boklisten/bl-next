import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "@mui/material";
import CheckoutStepper from "../components/checkout/CheckoutStepper";

const CartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Til betaling | Boklisten.no</title>
        <meta name="description" content="Til betaling" />
      </Head>
      <Card sx={{ paddingBottom: "2rem", paddingTop: "1rem" }}>
        <CheckoutStepper steps={["tos", "payment"]} />
      </Card>
    </>
  );
};

export default CartPage;
