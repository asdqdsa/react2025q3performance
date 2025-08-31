import type { CountryData } from '@/entities/model/types';
import { CountryRecord } from '@/entities/ui/CountryRecord';
import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { memo } from 'react';

export const List = memo(function List({
  countries,
}: {
  countries: [string, CountryData][];
}) {
  const data = countries;
  const record = useStateContext().state;
  const selectedYear = record.year;
  return (
    <div className="">
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
