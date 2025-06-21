import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieSlice {
  countries: number,
  genres: number,
  order: string,
  type: string,
  yearFrom: number,
  yearTo: number,
  page: number,
}


const initialState : MovieSlice = {
  countries: 1,
  genres: 1,
  order: 'NUM_VOTE',
  type: '',
  yearFrom: 1000,
  yearTo: 3000,
  page: 1,
};

export const currentMovieSlice = createSlice({
  name: 'currentMovieSlice',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<number>) => {state.countries = action.payload},
    setGenre: (state, action: PayloadAction<number>) => {state.genres = action.payload},
    setOrder: (state, action: PayloadAction<string>) => {state.order = action.payload},
    setYear: (state, action: PayloadAction<{ yearFrom: number; yearTo: number }>) => {
      state.yearFrom = action.payload.yearFrom;
      state.yearTo = action.payload.yearTo;
    },
    resetFilters: () => initialState
  },
});


export const { setCountry, setGenre, setYear, setOrder, resetFilters } = currentMovieSlice.actions;
export default currentMovieSlice.reducer;
