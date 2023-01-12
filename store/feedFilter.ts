import { PostType } from "@prisma/client";
import create from "zustand";

interface Filteres {
  numberOfPeople: number | null;
  postType: PostType | "";
}

interface FiltersState {
  filters: Filteres;
  setFilters: (newFilters: Filteres) => void;
}

export const useFilteresStore = create<FiltersState>()((set) => ({
  filters: {
    numberOfPeople: null,
    postType: "",
  },
  setFilters: (newFilteres) =>
    set((state) => ({ filters: { ...state, ...newFilteres } })),
}));
