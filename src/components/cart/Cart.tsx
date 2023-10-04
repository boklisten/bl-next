import { Table, TableBody, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import { isLoggedIn } from "api/auth";
import BackButton from "components/cart/BackButton";
import CartTableHeader from "components/cart/CartTableHeader";
import CartTableRow from "components/cart/CartTableRow";
import FixedSuccessButton from "components/FixedSuccessButton";
import { selectCartItems } from "redux/cart";
import { useAppSelector } from "redux/hooks";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const router = useRouter();

  const hasCustomerItemsInCart = cartItems.some(
    (cartItem) => cartItem.customerItem,
  );

  const branchCoversCosts = cartItems.every(
    (cartItem) => cartItem.orderItem.amount === 0,
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
              isLoggedIn() ? "/checkout" : "/auth/login?redirect=checkout",
            )
          }
        />
      )}
    </Box>
  );
};

export default Cart;
