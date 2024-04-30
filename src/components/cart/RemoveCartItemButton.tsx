import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";

import { CartItem, removeCartItem } from "@/redux/cart";
import { useAppDispatch } from "@/redux/hooks";

const RemoveCartItemButton = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <IconButton onClick={() => dispatch(removeCartItem(cartItem))}>
      <CancelIcon />
    </IconButton>
  );
};

export default RemoveCartItemButton;
