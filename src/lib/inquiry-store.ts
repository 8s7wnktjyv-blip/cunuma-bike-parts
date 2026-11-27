import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Discipline } from "@/data/catalog";

export const rimHeights = [35, 45, 55, 65] as const;
export const spokeCounts = [24, 28] as const;

export type RimHeight = (typeof rimHeights)[number];
export type SpokeCount = (typeof spokeCounts)[number];
export type Finish = "matte" | "gloss" | "weave";
export type Freehub = "hg" | "xdr" | "n3w";

export type WheelRequest = {
  id: string;
  discipline: Discipline;
  rimHeight: RimHeight;
  finish: Finish;
  freehub: Freehub;
  spokes: SpokeCount;
  createdAt: string;
};

export const finishLabel: Record<Finish, string> = {
  matte: "UD matt",
  gloss: "UD glänzend",
  weave: "Sichtcarbon",
};

export const freehubLabel: Record<Freehub, string> = {
  hg: "Shimano HG",
  xdr: "SRAM XDR",
  n3w: "Campagnolo N3W",
};

type InquiryState = {
  items: WheelRequest[];
  hydrated: boolean;
  add: (draft: Omit<WheelRequest, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  clear: () => void;
  setHydrated: (value: boolean) => void;
};

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export function describeRequest(item: WheelRequest): string {
  const line = item.discipline === "road" ? "CUNUMA Road" : "CUNUMA Gravel";
  return [
    line,
    `Wunsch-Felgenhöhe ${item.rimHeight} mm`,
    finishLabel[item.finish],
    `Freilaufwunsch ${freehubLabel[item.freehub]}`,
    `Speichenwunsch ${item.spokes}`,
    "Hinweis: Wunschkonfiguration, keine freigegebene Spezifikation und keine Lieferzusage.",
  ].join(" · ");
}

export const useInquiryStore = create<InquiryState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      add: (draft) => {
        const item: WheelRequest = {
          ...draft,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set({ items: [item, ...get().items].slice(0, 12) });
      },
      remove: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
      clear: () => set({ items: [] }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "cunuma-inquiry",
      skipHydration: true,
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : window.localStorage,
      ),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
