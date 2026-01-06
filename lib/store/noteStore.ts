import { create } from "zustand";
import { persist } from "zustand/middleware";

type CamperStore = {
  draft: NewCamper;
  setDraft: (note: Partial<NewCamper>) => void;
  clearDraft: () => void;
};

export const initialDraft: NewCamper = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useCamperDraftStore = create<CamperStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((prev) => ({
          draft: { ...prev.draft, ...note },
        })),
      clearDraft: () =>
        set(() => ({
          draft: initialDraft,
        })),
    }),
    {
      name: "note-draft",
    }
  )
);
