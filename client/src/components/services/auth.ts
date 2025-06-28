import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {UserIdResponse, AuthResponse, LoginRequest, RegisterRequest } from './types/auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: credentials => ({
        url: `/registration/sign-up`,
        method: "POST",
        body: credentials
      })
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: `/registration/sign-in`,
        method: "POST",
        body: credentials
      })
    }),
    currentUser: builder.query<UserIdResponse, void>({
      query: () => `/me`
    }),

  }),
});

export const {useRegisterMutation, useLoginMutation, useCurrentUserQuery} = authApi;
