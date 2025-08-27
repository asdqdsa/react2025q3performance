import { cn } from '@/shared/lib/cn';
import { useCO2Fetch } from './hooks/use-co2-fetch';
import { useEffect } from 'react';

export function Dashboard({ className }: { className?: string }) {
  const { cO2data, isLoading } = useCO2Fetch();
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
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
        {isLoading && <div className="text-foreground size-24">...</div>}
        {!isLoading &&
          Object.entries(cO2data ?? []).map(([country, { data, iso_code }]) => {
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
