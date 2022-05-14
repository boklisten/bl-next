import { useAppSelector } from "../../redux/hooks";
import { selectCartItems } from "../../redux/cart";
import { Table, TableBody, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { isLoggedIn } from "../../api/auth";
import FixedSuccessButton from "../FixedSuccessButton";
import BackButton from "./BackButton";
import CartTableHeader from "./CartTableHeader";
import CartTableRow from "./CartTableRow";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const router = useRouter();

  const hasCustomerItemsInCart = cartItems.some(
    (cartItem) => cartItem.customerItem
  );

  const branchCoversCosts = cartItems.every(
    (cartItem) => cartItem.orderItem.amount === 0
  );

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <BackButton hasCustomerItemsInCart={hasCustomerItemsInCart} />

      {cartItems.length > 0 ? (
        <TableContainer component={Box}>
          <Table>
            <CartTableHeader
              hasCustomerItemsInCart={hasCustomerItemsInCart}
              branchCoversCosts={branchCoversCosts}
            />
            <TableBody>
              {cartItems.map((cartItem) => (
                <CartTableRow key={cartItem.item.id} cartItem={cartItem} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Ingen bøker i handlekurv</Typography>
      )}

      {cartItems.length > 0 && (
        <FixedSuccessButton
          label={"Til betaling"}
          onClick={() =>
            router.push(
              isLoggedIn() ? "/checkout" : "/auth/login?redirect=checkout"
            )
          }
        />
      )}
    </Box>
  );
};

export default Cart;
