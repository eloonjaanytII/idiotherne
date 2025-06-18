import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/auth',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: credentials => ({
        url: `/registration/sign-up`,
        method: "POST",
        body: credentials
      })
    }),
    login: builder.mutation({
      query: credentials => ({
        url: `/registration/sign-in`,
        method: "POST",
        body: credentials
      })
    }),
    currentUser: builder.query({
      query: () => `/me`
    }),

  }),
});

export const {useRegisterMutation, useLoginMutation, useUpdateUserInfoMutation, useCurrentUserQuery} = authApi;
