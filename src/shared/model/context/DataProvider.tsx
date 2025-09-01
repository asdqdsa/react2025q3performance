import { fetchCO2 } from '@/entities/api/fetch';
import { DataContext } from './use-data-ctx';
import { use } from 'react';

const countriesPromise = fetchCO2();

export function DataProvider({ children }: { children: React.ReactNode }) {
  const data = use(countriesPromise);
  return <DataContext value={data}>{children}</DataContext>;
}
