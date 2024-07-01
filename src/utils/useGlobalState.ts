import { create } from "zustand";

interface GlobalState {
  selectedBranchId?: string;
  setSelectedBranchId: (branchId: string) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  setSelectedBranchId: (branchId) => set({ selectedBranchId: branchId }),
}));
