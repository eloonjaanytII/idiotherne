import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabChoice: "review",
};

export const userPageSlice = createSlice({
  name: 'userPageSlice',
  initialState,
  reducers: {
    saveTabChoice: (state, action) => {
      state.tabChoice = action.payload;
    },
  },
});

export const {saveTabChoice} = userPageSlice.actions
export default userPageSlice.reducer;