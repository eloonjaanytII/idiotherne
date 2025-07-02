import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnlineStatus {
    ids: number[];
};

const initialState: OnlineStatus = {
    ids: []
};

export const onlineStatusSlice = createSlice({
    name: 'onlineStatusSlice',
    initialState,
    reducers: {
        setOnlineUsers: (state, action: PayloadAction<number[]>) => {
            state.ids = action.payload;
        }
    }
});

export const {setOnlineUsers} = onlineStatusSlice.actions;
export default onlineStatusSlice.reducer;