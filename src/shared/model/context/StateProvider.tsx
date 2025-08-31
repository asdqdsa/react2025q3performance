import { useReducer } from 'react';
import { StateContext } from './use-state-ctx';

export type State = {
  search: string;
  year: number;
  sort: 'ASC' | 'DSC';
};

export type Action =
  | { type: 'SEARCH'; payload: { search: string } }
  | { type: 'SET_YEAR'; payload: { year: number } }
  | { type: 'SORT_NAME'; payload: { sort: 'ASC' | 'DSC' } };

const initialState = {
  year: 2023,
  search: '',
  sort: 'ASC',
} as const;
function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case 'SEARCH':
      console.log('search ', payload.search);
      return { ...state, search: payload.search };

    case 'SET_YEAR':
      console.log('year ', payload.year);
      return { ...state, year: payload.year };

    case 'SORT_NAME':
      return { ...state, sort: payload.sort };

    default:
      return state;
  }
}

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StateContext value={{ state, dispatch }}>{children}</StateContext>;
}
