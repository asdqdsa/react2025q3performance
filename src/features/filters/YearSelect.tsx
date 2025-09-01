import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { UiSelect } from '@/shared/uikit/ui-select';
import { useCallback, useMemo } from 'react';

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
    <UiSelect
      value={state.year}
      className="h-10 py-0 focus:outline-none"
      onChange={handleSelectYear}
    >
      {years.map((year) => (
        <UiSelect.Option key={year} value={year}>
          {year}
        </UiSelect.Option>
      ))}
    </UiSelect>
  );
}
