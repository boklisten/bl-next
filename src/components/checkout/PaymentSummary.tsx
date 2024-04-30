import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React from "react";

import { selectCartItems, selectDeliveryPrice } from "@/redux/cart";
import { useAppSelector } from "@/redux/hooks";

const readableOrderItemTypes = {
  rent: "lån",
  "partly-payment": "delbetaling",
  buyout: "utkjøp",
  extend: "forleng",
  buy: "kjøp",
  sell: "selg",
  return: "returner",
  cancel: "kanseller",
  loan: "lån",
  buyback: "tilbakekjøp",
  "invoice-paid": "betal faktura",
  "match-receive": "motta fra annen elev",
  "match-deliver": "lever til annen elev",
};
const PaymentSummary = () => {
  const cartItems = useAppSelector(selectCartItems);
  const deliveryPrice = useAppSelector(selectDeliveryPrice);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tittel</TableCell>
            <TableCell>Handling</TableCell>
            <TableCell>Pris</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((cartItem) => {
            const periodInfo =
              cartItem.orderItem.type === "buyout"
                ? ""
                : ` til ${moment(cartItem.orderItem.info?.to).format(
                    "DD/MM/YY",
                  )}`;
            return (
              <TableRow key={cartItem.item.id}>
                <TableCell>{cartItem.orderItem.title}</TableCell>
                <TableCell>
                  {readableOrderItemTypes[cartItem.orderItem.type]}
                  {periodInfo}
                </TableCell>
                <TableCell>{cartItem.orderItem.amount} kr</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableHead>
          {deliveryPrice > 0 && (
            <TableRow>
              <TableCell>Levering</TableCell>
              <TableCell></TableCell>
              <TableCell>{deliveryPrice} kr</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Sum</TableCell>
            <TableCell></TableCell>
            <TableCell>
              {cartItems.reduce(
                (previous, next) => previous + next.orderItem.amount,
                0,
              ) + deliveryPrice}
              {"\u00A0"}
              kr
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default PaymentSummary;
