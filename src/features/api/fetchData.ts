import { CONFIG, ENDPOINTS } from '@/shared/model/config';
import type { CO2CountriesData } from '../types';

export async function fetchCO2({ signal }: { signal: AbortSignal }) {
  try {
    const [res1, res2] = await Promise.all([
      fetch(new URL(`${ENDPOINTS.CO2_DATA_CHUNK}1.json`, CONFIG.API_BASE_URL), {
        signal,
      }),
      fetch(new URL(`${ENDPOINTS.CO2_DATA_CHUNK}2.json`, CONFIG.API_BASE_URL), {
        signal,
      }),
    ]);

    const [part1, part2] = await Promise.all([res1.json(), res2.json()]);

    return { ...part1, ...part2 } satisfies CO2CountriesData;
  } catch {
    throw new Error('Failed to fecth CO2 data');
  }
}
