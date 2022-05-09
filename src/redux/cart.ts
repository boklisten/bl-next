import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "./store";
import {
  Branch,
  BranchItem,
  CustomerItem,
  Item,
  OrderItem,
  Period,
} from "@boklisten/bl-model";
import { createOrderItem } from "../utils/cartUtils";

export interface CartItem {
  item: Item;
  branchItem: BranchItem;
  orderItem: OrderItem;
  customerItem?: CustomerItem;
  branch: Branch;
}

const initialState: { cartItems: CartItem[] } = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "setCart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload.sort((a, b) =>
        a.item.title.localeCompare(b.item.title)
      );
    },
    updatePeriod: (
      state,
      action: PayloadAction<{ cartItem: CartItem; updatedPeriod: Period }>
    ) => {
      const cartItem = action.payload.cartItem;
      state.cartItems = [
        ...current(state.cartItems).filter(
          (item) => item.item.id !== cartItem.item.id
        ),
        {
          ...cartItem,
          orderItem: createOrderItem(
            cartItem.branch,
            cartItem.item,
            cartItem.orderItem.type,
            action.payload.updatedPeriod
          ),
        } as CartItem,
      ].sort((a, b) => a.item.title.localeCompare(b.item.title));
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = current(state.cartItems).filter(
        (cartItem) => cartItem.item.id !== action.payload.item.id
      );
    },
  },
});

export const { setCart, updatePeriod, removeCartItem } = cartSlice.actions;

export const selectCartItems = (state: AppState) => state.cart.cartItems;

export default cartSlice.reducer;
