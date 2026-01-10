import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import { Camper } from "@/types";

export type Filters = {
  location?: string;
  form?: string;
  transmission?: string;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
};

type CamperStore = {
  items: Camper[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  activeFilters: Filters;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  fetchCampers: (filters: Filters) => Promise<void>;
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

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),

      isFavorite: (id) => get().favorites.includes(id),

fetchCampers: async (filters) => {
  set({ isLoading: true, error: null, items: [], page: 1, activeFilters: filters ?? {} });

  try {
    const { data } = await api.get("/campers", {
      params: { page: 1, limit: get().limit, ...(filters ?? {}) },
    });

    const newItems = data.items || (Array.isArray(data) ? data : []);
    const totalCount = data.total || (Array.isArray(data) ? data.length : 0);

    set({
      items: newItems,
      total: totalCount,
      page: 2,
      isLoading: false,
    });
  } catch (error) {
    set({ isLoading: false, items: [], error: "No campers found" });
  }
      },

      loadMore: async () => {
  const { isLoading, page, limit, activeFilters, items, total } = get();
  if (isLoading || (total > 0 && items.length >= total)) return;

  try {
    set({ isLoading: true });
    const { data } = await api.get("/campers", {
      params: { page, limit, ...activeFilters },
    });

    const addedItems = data.items || (Array.isArray(data) ? data : []);

    set((state) => ({
      items: [...state.items, ...addedItems],
      page: state.page + 1,
      isLoading: false,
    }));
  } catch {
    set({ isLoading: false });
  }
},

    reset: () => set({ items: [], total: 0, page: 1, activeFilters: {}, error: null }),
    }),
    {
      name: "traveltrucks-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);