export type CO2CountriesData = Record<string, CountryData>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type CountryData = {
  data: CountryYearData[];
  iso_code: string;
};
export type CountryYearData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
};
