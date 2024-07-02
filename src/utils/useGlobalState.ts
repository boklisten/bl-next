import { create } from "zustand";

interface GlobalState {
  selectedBranchId?: string;
  selectBranch: (branchId: string) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  selectBranch: (branchId) => set({ selectedBranchId: branchId }),
}));
