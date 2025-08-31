import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { UiInput } from '@/shared/uikit/ui-input';
import { useCallback } from 'react';

export function Search() {
  const { state, dispatch } = useStateContext();
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SEARCH', payload: { search: e.target.value } }),
    [dispatch]
  );

  return (
    <UiInput
      value={state.search}
      placeholder="Type country..."
      className="focus:outline-none"
      onChange={handleSearch}
    />
  );
}
