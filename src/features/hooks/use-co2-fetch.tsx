import { useEffect, useState } from 'react';
import { fetchCO2 } from '../api/fetchData';
import type { CO2CountriesData } from '../types';

export const useCO2Fetch = () => {
  const [cO2data, setCO2Data] = useState<CO2CountriesData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchCO2({ signal: controller.signal })
      .then(async (json) => {
        await new Promise((r) => setTimeout(r, 2000));
        setCO2Data(json);
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e as Error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  return { cO2data, isLoading, error };
};
