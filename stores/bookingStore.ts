import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingDraft {
  name: string;
  email: string;
  startDate: string | null; 
  endDate: string | null;
  comment: string;
}

const initialState: BookingDraft = {
  name: "",
  email: "",
  startDate: null,
  endDate: null,
  comment: "",
};

type BookingStore = {
  draft: BookingDraft;
  setDraft: (data: Partial<BookingDraft>) => void;
  clearDraft: () => void;
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      draft: initialState,
      setDraft: (data) =>
        set((state) => ({ draft: { ...state.draft, ...data } })),
      clearDraft: () => set({ draft: initialState }),
    }),
    {
      name: "booking-draft", // ключ в localStorage
    }
  )
);