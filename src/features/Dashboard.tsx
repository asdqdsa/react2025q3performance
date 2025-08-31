import { cn } from '@/shared/lib/cn';
// import { useDataContext } from '@/shared/model/context/use-data-ctx';
import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { useCountryList } from '@/shared/model/use-country-list';
import { UiInput } from '@/shared/uikit/ui-input';
import { UiSelect } from '@/shared/uikit/ui-select';
import { memo } from 'react';
import type { CountryData } from './types';
import { UiButton } from '@/shared/uikit/ui-button';

export function Dashboard({ className }: { className?: string }) {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [debounce, setDebounce] = useState(searchQuery);
  // const defferedQuery = useDeferredValue(debounce);
  // const data = useDataContext();
  const countryList = useCountryList();

  // useEffect(() => {
  //   const id = setTimeout(() => setDebounce(searchQuery), 400);
  //   return () => clearTimeout(id);
  // }, [searchQuery]);

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
  return (
    <div className="grid grid-cols-1 py-2">
      <UiInput
        value={state.search}
        placeholder="Type country..."
        className="focus:outline-none"
        onChange={(e) =>
          dispatch({ type: 'SEARCH', payload: { search: e.target.value } })
        }
      />
    </div>
  );
}

export function YearSelect() {
  const { state, dispatch } = useStateContext();

  const years = Array.from(
    { length: 2023 - 1750 + 1 },
    (_, i) => 1750 + i
  ).reverse();

  return (
    <UiSelect
      value={state.year}
      onChange={(e) =>
        dispatch({
          type: 'SET_YEAR',
          payload: { year: Number(e.target.value) },
        })
      }
    >
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
  return (
    <UiButton
      className="p-0 font-extralight"
      variant="outline"
      onClick={() =>
        dispatch({
          type: 'SORT_NAME',
          payload: { sort: currentSort === 'ASC' ? 'DSC' : 'ASC' },
        })
      }
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
          <div
            key={`${iso_code ?? country}-${selectedYear}`}
            className="flash-bg bg-card border-border grid grid-cols-6 border p-1 shadow-md"
          >
            <div>{country}</div>
            <div>{record?.co2 ?? 'N/A'}</div>
            <div>{selectedYear}</div>
            <div>{record?.population ?? 'N/A'}</div>
            <div>{record?.co2_per_capita ?? 'N/A'}</div>
            <div key={`${iso_code ?? country}-${selectedYear}`}>
              {iso_code ?? 'N/A'}
            </div>
          </div>
        );
      })}
    </div>
  );
});
