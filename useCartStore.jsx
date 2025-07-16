import { create } from "zustand";
import { useFavoritesStore } from "./useFavoritesStore";

export const useCartStore = create((set, get) => ({
  quantities: {},

  increment: (id) =>
    set((state) => {
      const curr = state.quantities[id] || 0;
      return { quantities: { ...state.quantities, [id]: curr + 1 } };
    }),

  decrement: (id) =>
    set((state) => {
      const curr = state.quantities[id] || 0;
      return {
        quantities: {
          ...state.quantities,
          [id]: curr > 0 ? curr - 1 : 0,
        },
      };
    }),
  addToCart: (id, qty = 1) => {
    for (let i = 0; i < qty; i++) {
      get().increment(id);
    }
  },

  removeFromCart: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.quantities;
      return { quantities: rest };
    }),

  clearCart: () => set({ quantities: {} }),

  totalItems: () => Object.values(get().quantities).reduce((a, b) => a + b, 0),
}));
