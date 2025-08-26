import co2data from '@/shared/data/owid-co2-data.json';
import { cn } from '@/shared/lib/cn';

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

const res: Entries<CO2CountriesData> = Object.entries(co2data);

export function Dashboard({ className }: { className?: string }) {
  return (
    <div className={cn('', className)}>
      <div className="grid grid-cols-1">
        <div className="bg-secondary grid grid-cols-5">
          <div>Country</div>
          <div>CO2</div>
          <div>Year</div>
          <div>Population</div>
          <div>Country Code</div>
        </div>
        {res.map(([country, { data, iso_code }]) => {
          return (
            <div
              key={iso_code}
              className="bg-card border-border grid grid-cols-5 border p-1 shadow-md"
            >
              <div>{country}</div>
              <div>{data[0]?.co2 ?? 'N/A'}</div>
              <div>{data[0]?.year ?? 'N/A'}</div>
              <div>{data[0]?.population ?? 'N/A'}</div>
              <div>{iso_code ?? 'N/A'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
