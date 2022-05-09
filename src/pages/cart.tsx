import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Cart from "../components/cart/Cart";

const CartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Handlekurv | Boklisten.no</title>
        <meta name="description" content="Din handlekurv" />
      </Head>
      <Card sx={{ paddingBottom: "2rem" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
        >
          Handlekurv
        </Typography>
        <Cart />
      </Card>
    </>
  );
};

export default CartPage;
