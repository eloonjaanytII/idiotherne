import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MessageResponse, UserData, UserList } from './types/users';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    usersList: builder.query<UserList, void>({
      query: () => `/users-list`
    }),

    userData: builder.query<UserData, number>({
      query: (paramsId) => `/user/${paramsId}`
    }),

    changeStatus: builder.mutation<MessageResponse, { status: string }>({
      query: ({status}) => ({
        url: `/status`,
        method: "PUT",
        body: status
      })
    }),
    
  }),
});

export const {useUsersListQuery, useUserDataQuery, useChangeStatusMutation} = usersApi;