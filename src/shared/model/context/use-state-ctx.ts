import { createContext, use } from 'react';
import type { Action, State } from './StateProvider';

export const StateContext = createContext<
  undefined | { state: State; dispatch: React.Dispatch<Action> }
>(undefined);

export function useStateContext() {
  const ctx = use(StateContext);
  if (!ctx) throw new Error('StateContext is not available');
  return ctx;
}
