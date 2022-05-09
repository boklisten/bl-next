import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import selectedBranch from "./selectedBranch";
import selectedSubjects from "./selectedSubjects";
import cart from "./cart";
import selectedCustomerItemActions from "./selectedCustomerItemActions";

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
