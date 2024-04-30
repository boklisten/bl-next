import { CustomerItem, OrderItemType } from "@boklisten/bl-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "@/redux/store";

export interface CustomerItemAction {
  customerItem: CustomerItem;
  action?: OrderItemType;
}
export interface SelectedCustomerItemActionsState {
  customerItemActions: Array<CustomerItemAction>;
}

const initialState: SelectedCustomerItemActionsState = {
  customerItemActions: [],
};

export const selectedCustomerItemActionsSlice = createSlice({
  name: "setSelectedCustomerItemActions",
  initialState,
  reducers: {
    setSelectedCustomerItemActions: (
      state,
      action: PayloadAction<CustomerItemAction[]>,
    ) => {
      state.customerItemActions = action.payload;
    },
  },
});

export const { setSelectedCustomerItemActions } =
  selectedCustomerItemActionsSlice.actions;

export const selectCustomerItemActions = (state: AppState) =>
  state.selectedCustomerItemActions.customerItemActions;

export default selectedCustomerItemActionsSlice.reducer;
