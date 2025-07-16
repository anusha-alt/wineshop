import { create } from "zustand";
export const useFilterStore= create((set) => ({
    filterType: null,
    setFilterType: (type) => set({ filterType: type}),
}));