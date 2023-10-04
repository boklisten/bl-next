import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import cart from "redux/cart";
import selectedBranch from "redux/selectedBranch";
import selectedCustomerItemActions from "redux/selectedCustomerItemActions";
import selectedSubjects from "redux/selectedSubjects";

export function makeStore() {
  return configureStore({
    reducer: {
      selectedBranch,
      selectedSubjects,
      cart,
      selectedCustomerItemActions,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
