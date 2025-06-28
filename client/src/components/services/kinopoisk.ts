import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Actor, CountryAndGenres, FilmFullDetail, FilmsCollectionsResponse, getFilmsQuery, RawFiltersResponse, StaffPerson } from './types/kinopoisk';

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

const excludeGenres:string[] = [
  "",
  "ток-шоу",
  "церемония",
] 

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api/',
    prepareHeaders: headers => {
      headers.set('X-API-KEY', kinopoiskApiKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({

    getFilmsCollections: builder.query<FilmsCollectionsResponse, { type:string, page:number }>({
      query: ({ type, page }) =>
        `v2.2/films/collections?type=${type}&page=${page}`,
    }),

    getFilms: builder.query<FilmsCollectionsResponse, getFilmsQuery>({
      query: ({
        countries = 1,
        genres = 1,
        order = "NUM_VOTE",
        type = "FILM",
        yearFrom = 1000,
        yearTo = 3000,
        page = 1,
        keyword = '',
      }) => 
        `v2.2/films?countries=${countries}&genres=${genres}&order=${order}&type=${type}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}&keyword=${keyword}`
    }),

    getGenresAndCountries: builder.query<CountryAndGenres, void>({
      query: () => `v2.2/films/filters`,
      transformResponse: (response: RawFiltersResponse) : CountryAndGenres => ({
        ...response,
        genres: response.genres.filter(({genre}) => !excludeGenres.includes(genre))
      })
    }),

    getFilmDetail: builder.query<FilmFullDetail, number>({
      query: id => `v2.2/films/${id}`
    }),

    getStaff: builder.query<StaffPerson[], number>({
      query: id => `v1/staff?filmId=${id}`
    }),

    getActorDetail: builder.query<Actor, number>({
      query: id => `v1/staff/${id}`
    })


  }),
});

export const { useGetFilmsCollectionsQuery, 
               useGetFilmsQuery, 
               useGetGenresAndCountriesQuery,
               useGetFilmDetailQuery,
               useGetStaffQuery,
               useGetActorDetailQuery,
               } = kinopoiskApi;
