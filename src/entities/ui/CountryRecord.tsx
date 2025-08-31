import { memo } from 'react';
import { RecordCell } from './RecordCell';

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
