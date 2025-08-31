import { cn } from '@/shared/lib/cn';
import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { useCountryList } from '@/shared/model/use-country-list';
import { UiButton } from '@/shared/uikit/ui-button';
import { UiInput } from '@/shared/uikit/ui-input';
import { UiSelect } from '@/shared/uikit/ui-select';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CountryData } from './types';

export function Dashboard({ className }: { className?: string }) {
  const countryList = useCountryList();

  return (
    <div className={cn('', className)}>
      <Search />
      <YearSelect />
      <SortByName />
      <List countries={countryList} />
    </div>
  );
}

export function Search() {
  const { state, dispatch } = useStateContext();
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SEARCH', payload: { search: e.target.value } }),
    [dispatch]
  );

  return (
    <div className="grid grid-cols-1 py-2">
      <UiInput
        value={state.search}
        placeholder="Type country..."
        className="focus:outline-none"
        onChange={handleSearch}
      />
    </div>
  );
}

export function YearSelect() {
  const { state, dispatch } = useStateContext();

  const handleSelectYear = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch({
        type: 'SET_YEAR',
        payload: { year: Number(e.target.value) },
      }),
    [dispatch]
  );

  const years = useMemo(
    () => Array.from({ length: 2023 - 1750 + 1 }, (_, i) => 1750 + i).reverse(),
    []
  );

  return (
    <UiSelect value={state.year} onChange={handleSelectYear}>
      {years.map((year) => (
        <UiSelect.Option key={year} value={year}>
          {year}
        </UiSelect.Option>
      ))}
    </UiSelect>
  );
}

export function SortByName() {
  const { state, dispatch } = useStateContext();
  const currentSort = state.sort;
  const handleSort = useCallback(
    () =>
      dispatch({
        type: 'SORT_NAME',
        payload: { sort: currentSort === 'ASC' ? 'DSC' : 'ASC' },
      }),
    [dispatch, currentSort]
  );
  return (
    <UiButton
      className="p-0 font-extralight"
      variant="outline"
      onClick={handleSort}
    >
      {currentSort === 'ASC' ? 'Descending By Name' : 'Ascending By Name'}
    </UiButton>
  );
}

export const List = memo(function List({
  countries,
}: {
  countries: [string, CountryData][];
}) {
  const data = countries;
  const record = useStateContext().state;
  const selectedYear = record.year;
  return (
    <div className="grid grid-cols-1">
      <div className="bg-secondary grid grid-cols-6">
        <div>Country</div>
        <div>CO2</div>
        <div>Year</div>
        <div>Population</div>
        <div>CO2 per Capita</div>
        <div>Country Code</div>
      </div>
      {data.map(([country, { data: stats, iso_code }]) => {
        const record = stats.find((d) => d.year === selectedYear);
        return (
          <CountryRecord
            key={iso_code ?? country}
            isoCode={iso_code}
            country={country}
            co2={record?.co2}
            year={record?.year ?? 0}
            population={record?.population}
            co2PerCapita={record?.co2_per_capita}
          />
        );
      })}
    </div>
  );
});

export const CountryRecord = memo(function CountryRecord({
  isoCode,
  country,
  co2,
  year,
  population,
  co2PerCapita,
}: {
  isoCode: string;
  country: string;
  co2?: number;
  year: number;
  population?: number;
  co2PerCapita?: number;
}) {
  return (
    <div className="bg-card border-border grid grid-cols-6 border p-1 shadow-md">
      <RecordCell value={country} />
      <RecordCell value={co2 ?? 'N/A'} />
      <RecordCell value={year} />
      <RecordCell value={population ?? 'N/A'} />
      <RecordCell value={co2PerCapita ?? 'N/A'} />
      <RecordCell value={isoCode} />
    </div>
  );
});

export const RecordCell = memo(function RecordCell({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  const prev = useRef(value);
  const [flash, setFlash] = useState<boolean>(false);

  useEffect(() => {
    if (Object.is(prev.current, value)) return;

    prev.current = value;
    setFlash(false);

    const raf = requestAnimationFrame(() => setFlash(true));
    const t = setTimeout(() => setFlash(false), 600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [value]);

  return (
    <div className={cn(flash && 'flash-bg', 'rounded-sm', className)}>
      {value}
    </div>
  );
});
