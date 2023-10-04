import { BranchItem, OrderItemType } from "@boklisten/bl-model";
import { TableCell, TableRow, Tooltip } from "@mui/material";
import moment from "moment";

import RemoveCartItemButton from "components/cart/RemoveCartItemButton";
import SelectDeadline from "components/cart/SelectDeadline";
import { CartItem } from "redux/cart";
import { useAppSelector } from "redux/hooks";
import { selectSubjects } from "redux/selectedSubjects";

const getReadableOrderType = (orderItemType: OrderItemType) =>
  orderItemType === "extend" ? "forlenging" : "utkjøp";

const CartTableRow = ({ cartItem }: { cartItem: CartItem }) => {
  const selectedSubjects = useAppSelector(selectSubjects);
  const getItemSubjects = (item: BranchItem) =>
    item.categories?.filter((category) =>
      selectedSubjects.includes(category),
    ) ?? [];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  const amountLeftToPay = cartItem.orderItem.info?.amountLeftToPay ?? 0;

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            borderBottom: {
              xs: "none",
              sm: "1px solid rgba(224, 224, 224, 1)",
            },
          }}
        >
          {cartItem.item.title}
          {!cartItem.customerItem &&
            ` (${getItemSubjects(cartItem.branchItem).join(", ")})`}
        </TableCell>
        <TableCell
          sx={{
            borderBottom: {
              xs: "none",
              sm: "1px solid rgba(224, 224, 224, 1)",
            },
          }}
        >
          {cartItem.customerItem
            ? getReadableOrderType(cartItem.orderItem.type)
            : `${cartItem.orderItem.amount} kr`}
        </TableCell>
        <Tooltip
          sx={{
            borderBottom: {
              xs: "none",
              sm: "1px solid rgba(224, 224, 224, 1)",
            },
          }}
          title={
            cartItem.customerItem
              ? ""
              : "Dersom du leverer tilbake boken før fristen, slipper du å betale dette beløpet"
          }
        >
          <TableCell>
            {cartItem.orderItem.amount !== 0 &&
              (cartItem.customerItem
                ? cartItem.orderItem.unitPrice
                : amountLeftToPay)}
            {cartItem.orderItem.amount !== 0 && " kr"}
          </TableCell>
        </Tooltip>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          {cartItem.customerItem ? (
            cartItem.orderItem.info?.to ? (
              moment(cartItem.orderItem.info.to ?? "").format("DD/MM/YY")
            ) : (
              "-"
            )
          ) : (
            <SelectDeadline cartItem={cartItem} />
          )}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          <RemoveCartItemButton cartItem={cartItem} />
        </TableCell>
      </TableRow>

      {/* Use an extra row on mobile */}
      <TableRow sx={{ display: { xs: "table-row", sm: "none" } }}>
        <TableCell sx={{ paddingTop: 0 }}>
          {cartItem.customerItem ? (
            "Ny frist: " +
            (cartItem.orderItem.info?.to
              ? moment(cartItem.orderItem.info.to ?? "").format("DD/MM/YY")
              : "-")
          ) : (
            <SelectDeadline cartItem={cartItem} />
          )}
        </TableCell>
        <TableCell sx={{ paddingTop: 0, width: "80px" }}></TableCell>
        <TableCell sx={{ paddingTop: 0 }}>
          <RemoveCartItemButton cartItem={cartItem} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartTableRow;
