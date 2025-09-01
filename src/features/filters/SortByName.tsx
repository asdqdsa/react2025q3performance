import { useStateContext } from '@/shared/model/context/use-state-ctx';
import { UiButton } from '@/shared/uikit/ui-button';
import { useCallback } from 'react';

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
      className="h-10 font-extralight focus:outline-none"
      variant="secondary"
      onClick={handleSort}
    >
      {currentSort === 'ASC' ? 'Descending By Name' : 'Ascending By Name'}
    </UiButton>
  );
}
