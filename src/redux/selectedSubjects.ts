import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "redux/store";

export interface SelectedSubjectsState {
  subjects: string[];
}

const initialState: SelectedSubjectsState = {
  subjects: [],
};

export const selectedSubjectsSlice = createSlice({
  name: "setSelectedSubjects",
  initialState,
  reducers: {
    setSelectedSubjects: (state, action: PayloadAction<string[]>) => {
      state.subjects = action.payload;
    },
  },
});

export const { setSelectedSubjects } = selectedSubjectsSlice.actions;

export const selectSubjects = (state: AppState) =>
  state.selectedSubjects.subjects;

export default selectedSubjectsSlice.reducer;
