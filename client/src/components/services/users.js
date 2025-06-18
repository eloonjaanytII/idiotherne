import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/users',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    usersList: builder.query({
      query: () => `/users-list`
    }),

    userData: builder.query({
      query: (paramsId) => `/user/${paramsId}`
    }),

    changeStatus: builder.mutation({
      query: status => ({
        url: `/status`,
        method: "PUT",
        body: status
      })
    }),
    
  }),
});

export const {useUsersListQuery, useUserDataQuery, useChangeStatusMutation} = usersApi;