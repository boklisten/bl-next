import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CartItem,
  removeCartItem,
  selectCartItems,
  updatePeriod,
} from "../../redux/cart";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import { Branch, BranchItem, OrderItemType, Period } from "@boklisten/bl-model";
import {
  getOrderItemTypeFromBranch,
  getPartlyPaymentPeriodDate,
  getRentPeriodDate,
} from "../../utils/cartUtils";
import CancelIcon from "@mui/icons-material/Cancel";
import { selectSubjects } from "../../redux/selectedSubjects";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { isLoggedIn } from "../../api/auth";

const getDeadline = (period: Period, branch: Branch) => {
  const deadline =
    getOrderItemTypeFromBranch(branch) === "rent"
      ? getRentPeriodDate(branch, period)
      : getPartlyPaymentPeriodDate(branch, period);
  return moment(deadline).format("DD/MM/YY");
};

const RemoveCartItemButton = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <IconButton onClick={() => dispatch(removeCartItem(cartItem))}>
      <CancelIcon />
    </IconButton>
  );
};

const SelectDeadline = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <FormControl>
      <InputLabel id="select-deadline">Velg frist</InputLabel>
      <Select
        labelId="select-deadline"
        value={cartItem.orderItem.info?.periodType}
        label="Velg frist"
        onChange={(event) =>
          dispatch(
            updatePeriod({
              cartItem,
              updatedPeriod: event.target.value as Period,
            })
          )
        }
      >
        <MenuItem value="semester">
          {getDeadline("semester", cartItem.branch)}
        </MenuItem>
        <MenuItem value="year">{getDeadline("year", cartItem.branch)}</MenuItem>
      </Select>
    </FormControl>
  );
};

const CartItemRow = ({ cartItem }: { cartItem: CartItem }) => {
  const selectedSubjects = useAppSelector(selectSubjects);
  const getItemSubjects = (item: BranchItem) =>
    item.categories?.filter((category) =>
      selectedSubjects.includes(category)
    ) ?? [];

  const getReadableOrderType = (orderItemType: OrderItemType) =>
    orderItemType === "extend" ? "forlenging" : "utkjøp";

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

const hasCustomerItemsInCart = (cartItems: CartItem[]) =>
  cartItems.some((cartItem) => cartItem.customerItem);

const branchCoversCosts = (cartItems: CartItem[]) =>
  cartItems.every((cartItem) => cartItem.orderItem.amount === 0);

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const router = useRouter();
  console.log(cartItems);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        onClick={() =>
          router.push(
            hasCustomerItemsInCart(cartItems) ? "/users/me/items" : "/order"
          )
        }
        sx={{ width: "200px" }}
      >
        {hasCustomerItemsInCart(cartItems)
          ? "Tilbake til mine bøker"
          : "Endre fag"}
      </Button>
      {cartItems.length > 0 ? (
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tittel</TableCell>
                <TableCell>
                  {hasCustomerItemsInCart(cartItems) ? "Handling" : "Betal nå"}
                </TableCell>
                <TableCell>
                  {!branchCoversCosts(cartItems) &&
                    (hasCustomerItemsInCart(cartItems) ? "Pris" : "2. avdrag")}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {hasCustomerItemsInCart(cartItems) ? "Ny frist" : "Frist"}
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cartItem) => (
                <CartItemRow key={cartItem.item.id} cartItem={cartItem} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Ingen bøker i handlekurv</Typography>
      )}
      <LoadingButton
        color="success"
        variant="contained"
        sx={{ position: "fixed", bottom: ".5rem", zIndex: 10 }}
        onClick={() => {
          if (isLoggedIn()) {
            // go to checkout
          } else {
            router.push("/auth/login?redirect=checkout");
          }
        }}
      >
        Til betaling
      </LoadingButton>
    </Box>
  );
};

export default Cart;
