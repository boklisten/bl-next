import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "./store";

export interface SelectedBranchState {
  id: string;
}

const initialState: SelectedBranchState = {
  id: "",
};

export const branchSlice = createSlice({
  name: "selectedBranch",
  initialState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setSelectedBranch } = branchSlice.actions;

export const selectBranch = (state: AppState) => state.selectedBranch;

export default branchSlice.reducer;
