import type { CO2CountriesData } from '@/entities/model/types';
import { createContext, use } from 'react';

export const DataContext = createContext<undefined | CO2CountriesData>(
  undefined
);

export function useDataContext(): CO2CountriesData {
  const ctx = use(DataContext);
  if (!ctx) throw new Error('DataContext is not available');
  return ctx;
}
