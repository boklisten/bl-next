import {
  Branch,
  BranchItem,
  CustomerItem,
  DeliveryMethod,
  Item,
  OrderItem,
  Period,
} from "@boklisten/bl-model";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "redux/store";
import { createOrderItem } from "utils/cartUtils";

export interface CartItem {
  item: Item;
  branchItem: BranchItem;
  orderItem: OrderItem;
  customerItem?: CustomerItem;
  branch: Branch;
}

const initialState: {
  cartItems: CartItem[];
  orderID: string;
  deliveryMethod: DeliveryMethod | undefined;
  deliveryPrice: number;
} = {
  cartItems: [],
  orderID: "",
  deliveryMethod: undefined,
  deliveryPrice: 0,
};

export const cartSlice = createSlice({
  name: "setCart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload.sort((a, b) =>
        a.item.title.localeCompare(b.item.title),
      );
    },
    setOrderID: (state, action: PayloadAction<string>) => {
      state.orderID = action.payload;
    },
    setDeliveryMethod: (
      state,
      action: PayloadAction<DeliveryMethod | undefined>,
    ) => {
      state.deliveryMethod = action.payload;
    },
    setDeliveryPrice: (state, action: PayloadAction<number>) => {
      state.deliveryPrice = action.payload;
    },
    updatePeriod: (
      state,
      action: PayloadAction<{ cartItem: CartItem; updatedPeriod: Period }>,
    ) => {
      const cartItem = action.payload.cartItem;
      state.cartItems = [
        ...current(state.cartItems).filter(
          (item) => item.item.id !== cartItem.item.id,
        ),
        {
          ...cartItem,
          orderItem: createOrderItem(
            cartItem.branch,
            cartItem.item,
            cartItem.orderItem.type,
            action.payload.updatedPeriod,
          ),
        } as CartItem,
      ].sort((a, b) => a.item.title.localeCompare(b.item.title));
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = current(state.cartItems).filter(
        (cartItem) => cartItem.item.id !== action.payload.item.id,
      );
    },
  },
});

export const {
  setCart,
  updatePeriod,
  removeCartItem,
  setOrderID,
  setDeliveryMethod,
  setDeliveryPrice,
} = cartSlice.actions;

export const selectCartItems = (state: AppState) => state.cart.cartItems;

export const selectOrderID = (state: AppState) => state.cart.orderID;

export const selectDeliveryMethod = (state: AppState) =>
  state.cart.deliveryMethod;

export const selectDeliveryPrice = (state: AppState) =>
  state.cart.deliveryPrice;

export default cartSlice.reducer;
