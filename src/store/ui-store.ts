import { create } from "zustand";

import type { ThemeMode } from "@/types/ui";

type UIState = {
  theme: ThemeMode;
  cursorVisible: boolean;
  modalOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  setCursorVisible: (visible: boolean) => void;
  setModalOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  theme: "dark",
  cursorVisible: true,
  modalOpen: false,
  setTheme: (theme) => set({ theme }),
  setCursorVisible: (cursorVisible) => set({ cursorVisible }),
  setModalOpen: (modalOpen) => set({ modalOpen }),
}));
