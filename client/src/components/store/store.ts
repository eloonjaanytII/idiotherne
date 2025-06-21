import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import currentMovieReducer from './features/currentMovieSlice';
import authSliceReducer from './features/authSlice';
import userPageReducer from './features/userPageSlice';

import { kinopoiskApi } from '../services/kinopoisk';
import { authApi } from '../services/auth';
import { reviewApi } from '../services/review';
import { usersApi } from '../services/users';
import { filmsApi } from "../services/films";

export const store = configureStore({
  reducer: {
    currentMovie: currentMovieReducer,
    authSlice: authSliceReducer,
    userPageSlice: userPageReducer,
    
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
    [filmsApi.reducerPath] : filmsApi.reducer,

  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
  .concat(kinopoiskApi.middleware)
  .concat(authApi.middleware)
  .concat(reviewApi.middleware)
  .concat(usersApi.middleware)
  .concat(filmsApi.middleware)
  ,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;