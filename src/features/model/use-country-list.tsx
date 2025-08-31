import { useDataContext } from '@/shared/model/context/use-data-ctx';
import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { useMemo } from 'react';

export function useCountryList() {
  const data = useDataContext();
  const { state } = useStateContext();
  const { search, year, sort } = state;

  return useMemo(() => {
    let countries = Object.entries(data).filter(([country, _]) => {
      if (search.trim() === '') return true;
      return country.toLowerCase().includes(search.trim().toLowerCase());
    });

    countries = countries.filter(([_, stats]) => {
      const record = stats.data.find((entry) => entry.year === year);
      return record !== undefined;
    });

    countries.sort((a, b) =>
      sort === 'ASC' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])
    );

    return countries;
  }, [data, search, year, sort]);
}
