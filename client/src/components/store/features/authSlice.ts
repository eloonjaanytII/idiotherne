import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  isAuth: boolean,
  userId: number | null, 
}

const initialState: AuthSlice = {
  isAuth: false,
  userId: null, 
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<number | null>) => {
      state.isAuth = true;
      state.userId = action.payload;
    },
    login: (state,  action: PayloadAction<number | null>) => {
      state.isAuth = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userId = null;
    }
  },
});

export const {setCredentials, login, logout} = authSlice.actions
export default authSlice.reducer;