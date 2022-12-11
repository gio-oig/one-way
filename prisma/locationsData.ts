export interface Location {
  region: string;
  cities: string[];
}

export const regionsWithCities: Location[] = [
  {
    region: "სამეგრელო",
    cities: ["სენაკი", "ფოთი"],
  },
  {
    region: "აჭარა",
    cities: ["ბათუმი"],
  },
  {
    region: "გურია",
    cities: ["ქობულეთი"],
  },
];
