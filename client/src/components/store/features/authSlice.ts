import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  isAuth: boolean,
  userId: number | null, 
  token: string | null;
}

const initialState: AuthSlice = {
  isAuth: false,
  userId: null, 
  token: null,
};

interface AuthPayload {
  userId: number | null;
  token: string | null;
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.isAuth = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userId = null;
      state.token = null;
    }
  },
});

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer;