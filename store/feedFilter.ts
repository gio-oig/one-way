import { PostType } from "@prisma/client";
import create from "zustand";

interface Filteres {
  originCityId: number | string;
  destinationCityId: number | string;
  numberOfPeople: number | string;
  postType: PostType | "";
  moveOutDate: string | null;
}

interface FiltersState {
  filters: Filteres;
  setFilters: (newFilters: Filteres) => void;
  resetFilter: () => void;
}

const initialFilters: Filteres = {
  numberOfPeople: "",
  postType: "",
  destinationCityId: "",
  originCityId: "",
  moveOutDate: null,
};

export const useFilteresStore = create<FiltersState>()((set) => ({
  filters: initialFilters,
  setFilters: (newFilteres) =>
    set((state) => ({ filters: { ...newFilteres } })),
  resetFilter: () => set((state) => ({ ...state, filters: initialFilters })),
}));
