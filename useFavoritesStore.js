import {create} from "zustand";
export const useFavoritesStore= create((set) => ({
    favorites: [],
    toggleFavorite: (id) =>
        set((state) => ({
            favorites: state.favorites.includes(id) ? state.favorites.filter((fid) => fid !== id): [...state.favorites, id],

        })),
    
}));