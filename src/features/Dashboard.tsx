import { cn } from '@/shared/lib/cn';
import { UiInput } from '@/shared/uikit/ui-input';
import {
  memo,
  use,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchCO2 } from './api/fetchData';
import type { CO2CountriesData } from './types';

const defaultCountriesPromise = fetchCO2();

export function Dashboard({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debounce, setDebounce] = useState(searchQuery);
  const defferedQuery = useDeferredValue(debounce);

  const [countiresPromise] = useState(defaultCountriesPromise);
  const data = use(countiresPromise);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebounce(searchQuery), 400);
    return () => clearTimeout(id);
  }, [searchQuery]);

  const filterCountries = useMemo(() => {
    if (defferedQuery.trim() === '') return data;
    return Object.fromEntries(
      Object.entries(data).filter(([name, _]) => {
        return name.toLowerCase().includes(defferedQuery.toLowerCase());
      })
    );
  }, [data, defferedQuery]);

  return (
    <div className={cn('', className)}>
      <Search value={searchQuery} onChange={onSearch} />
      <List countries={filterCountries} />
    </div>
  );
}

export function Search({
  onChange,
  value,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="py-2">
      <UiInput
        value={value}
        placeholder="Type country..."
        onChange={onChange}
      ></UiInput>
    </div>
  );
}

export const List = memo(function List({
  countries,
  // countriesPromise,
}: {
  countries: CO2CountriesData;
  // countriesPromise: Promise<CO2CountriesData>;
}) {
  // const data = use(countriesPromise);
  const data = countries;
  return (
    <div className="grid grid-cols-1">
      <div className="bg-secondary grid grid-cols-5">
        <div>Country</div>
        <div>CO2</div>
        <div>Year</div>
        <div>Population</div>
        <div>Country Code</div>
      </div>
      {Object.entries(data ?? []).map(([country, { data, iso_code }]) => {
        const lastYear = data[data.length - 1]?.year ?? 'N/A';
        return (
          <div
            key={iso_code ?? country}
            className="bg-card border-border grid grid-cols-5 border p-1 shadow-md"
          >
            <div>{country}</div>
            <div>{data[0]?.co2 ?? 'N/A'}</div>
            <div>{lastYear}</div>
            <div>{data[0]?.population ?? 'N/A'}</div>
            <div>{iso_code ?? 'N/A'}</div>
          </div>
        );
      })}
    </div>
  );
});
