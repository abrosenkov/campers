import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper, CampersQuery } from "@/types";
import { getCampers } from "@/lib/campers";


type CamperStore = {
  items: Camper[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  activeFilters: CampersQuery;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  fetchCampers: (filters?: CampersQuery) => Promise<void>;
  loadMore: () => Promise<void>;
  reset: () => void;
};

export const useCamperStore = create<CamperStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      page: 1,
      limit: 4,
      isLoading: false,
      error: null,
      activeFilters: {},
      favorites: [],

      // favorites
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),

      isFavorite: (id) => get().favorites.includes(id),

      // new search
      fetchCampers: async (filters = {}) => {
        set({
          isLoading: true,
          error: null,
          items: [],
          page: 1,
          activeFilters: filters,
        });

        try {
          const data = await getCampers({
            page: 1,
            limit: get().limit,
            ...filters,
          });

          set({
            items: data.items,
            total: data.total,
            page: 2,
            isLoading: false,
          });
        } catch {
          set({
            isLoading: false,
            error: "Failed to load campers",
          });
        }
      },

      // pagination
      loadMore: async () => {
        const { page, limit, activeFilters, items, total, isLoading } = get();
        if (isLoading || items.length >= total) return;

        set({ isLoading: true });

        try {
          const data = await getCampers({
            page,
            limit,
            ...activeFilters,
          });

          set({
            items: [...items, ...data.items],
            page: page + 1,
            isLoading: false,
          });
        } catch {
          set({ isLoading: false });
        }
      },

      // reset
      reset: () =>
        set({
          items: [],
          total: 0,
          page: 1,
          activeFilters: {},
          error: null,
        }),
    }),
    {
      name: "traveltrucks-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);