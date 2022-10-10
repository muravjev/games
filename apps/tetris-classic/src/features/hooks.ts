import type { TypedUseSelectorHook } from 'react-redux';

import { store } from 'features/store';
import { useDispatch, useSelector } from 'react-redux';

export type Dispatch = typeof store.dispatch;

export type GetState = typeof store.getState;
export type TState = ReturnType<GetState>;

export type Select<R> = (state: TState) => R;
export type Thunk<R = void> = (dispatch: Dispatch, getState: GetState) => R;

export const useAppDispatch: () => Dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
