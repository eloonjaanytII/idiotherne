import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSlice {
  tabChoice: string;
}

const initialState: UserSlice = {
  tabChoice: "review",
};

export const userPageSlice = createSlice({
  name: 'userPageSlice',
  initialState,
  reducers: {
    saveTabChoice: (state, action: PayloadAction<string>) => {
      state.tabChoice = action.payload;
    },
  },
});

export const {saveTabChoice} = userPageSlice.actions
export default userPageSlice.reducer;