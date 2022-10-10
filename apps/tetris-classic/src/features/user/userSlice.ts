import type { TState } from 'features/hooks';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

type User = { id?: string; name?: string };

const name = 'user';
const initialState: User = {};

const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        setupUser: (state, action: PayloadAction<User>) => {
            return action.payload;
        }
    }
});

export default userSlice;

export const { setupUser } = userSlice.actions;

export const selectUser = (state: TState): User => state[name];

export const selectUserId = (state: TState) => selectUser(state).id;
export const selectUserName = (state: TState) => selectUser(state).name;
