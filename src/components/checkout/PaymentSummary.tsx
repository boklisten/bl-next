import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCartItems } from "../../redux/cart";
import moment from "moment";

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
};
const PaymentSummary = () => {
  const cartItems = useAppSelector(selectCartItems);

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
              cartItem.orderItem.type !== "buyout"
                ? ` til ${moment(cartItem.orderItem.info?.to).format(
                    "DD/MM/YY"
                  )}`
                : "";
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
          <TableRow>
            <TableCell>Sum</TableCell>
            <TableCell></TableCell>
            <TableCell>
              {cartItems.reduce(
                (previous, next) => previous + next.orderItem.amount,
                0
              )}{" "}
              kr
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default PaymentSummary;
