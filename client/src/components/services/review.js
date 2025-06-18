import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/review',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    sendReview: builder.mutation({
      query: body => ({
        url: `/`,
        method: "POST",
        body,
      })
    }),

    getUserReview: builder.query({  
        query: (userId) => `/user-review/${userId}`
    }),

    getMovieReviews: builder.query({  
        query: (filmId) => `/movie-review/${filmId}`
    }),

  }),
});

export const {useSendReviewMutation, useGetUserReviewQuery, useGetMovieReviewsQuery} = reviewApi;
