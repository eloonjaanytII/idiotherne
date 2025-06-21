import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FilmData, UserFilmFlags, FilmMessageResponse, UserFilmWithScore } from './types/films';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/films`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    sendFilms: builder.mutation<FilmMessageResponse, Omit<UserFilmFlags, "userId" | "createdAt" | "updatedAt">>({
      query: body => ({
        url: `/`,
        method: "PUT",
        body,
      })
    }),

    getFilm: builder.query<FilmData, number>({
      query: (kinopoiskId) => `/film/${kinopoiskId}`
    }),

    getUserFilms: builder.query<FilmData[], number>({
      query: (userId) => `/user-films/${userId}`
    }),

    getUserFilmFlag: builder.query<UserFilmFlags, number>({
      query: (kinopoiskId) => `/film-flag/${kinopoiskId}`
    }),

    getUserFilmWithScores: builder.query<UserFilmWithScore[], number>({
      query: (userId) => `/film-score/${userId}`
    }),

    getUserFilmWithFavorite: builder.query<FilmData[], number>({
      query: (userId) => `/film-favorite/${userId}`
    })

  }),
});

export const {useSendFilmsMutation, 
              useGetUserFilmsQuery, 
              useGetFilmQuery, 
              useGetUserFilmFlagQuery, 
              useGetUserFilmWithFavoriteQuery,
              useGetUserFilmWithScoresQuery,
            } = filmsApi;