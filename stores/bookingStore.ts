import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingDraft {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const initialState: BookingDraft = {
  name: "",
  email: "",
  date: "",
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