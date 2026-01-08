import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import { Camper } from "@/types";

type CamperStore = {
  items: Camper[];
  total: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  favorites: string[];
  fetchCampers: (filters?: object, isNewSearch?: boolean) => Promise<void>;
  toggleFavorite: (id: string) => void;
  resetItems: () => void;
};

export const useCamperStore = create<CamperStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      page: 1,
      isLoading: false,
      error: null,
      favorites: [],

      // Fetch campers with support for pagination and filtering
      fetchCampers: async (filters = {}, isNewSearch = false) => {
        set({ isLoading: true, error: null });

        // Reset to page 1 if it's a new search/filter application
        const currentPage = isNewSearch ? 1 : get().page;

        try {
          const response = await api.get("/campers", {
            params: {
              page: currentPage,
              limit: 4,
              ...filters,
            },
          });

          const { total, items } = response.data;

          set((state) => ({
            items: isNewSearch ? items : [...state.items, ...items],
            total: total,
            page: isNewSearch ? 2 : currentPage + 1,

            isLoading: false,
          }));
        } catch (error: unknown) {
          let errorMessage = "An unknown error occurred";

          if (error instanceof Error) {
            errorMessage = error.message;
          }

          set({ isLoading: false, error: errorMessage });
        }
      },

      // Toggle camper ID in the favorites list
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
      // Reset store state to initial
      resetItems: () => set({ items: [], page: 1, total: 0, error: null }),
    }),
    {
      name: "camper-favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
