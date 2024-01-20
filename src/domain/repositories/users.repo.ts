import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { prepareHeaders } from './repo.helper';

const baseUrl = `${API_BASE_URL}/api/v1/core`;

export const
  usersTag = 'uiUsers',
  userDetailsTag = 'uiUserDetails',
  usersRepo: any = createApi({
    reducerPath: 'usersRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    tagTypes: [ usersTag, userDetailsTag ],
    endpoints: ( builder ) => ({
      getAllUsers: builder.query({
        query: () => ({
          url: '/users',
          method: 'GET',
        }),
        providesTags: [ usersTag ],
      }),
      getUserDetails: builder.query({
        query: ( uid: string ) => ({
          url: `/users/${uid}/user-details`,
          method: 'GET',
        }),
        providesTags: [ userDetailsTag ],
      }),
      setUserTenant: builder.mutation({
        query: ( data ) => ({
          url: '/users/user-tenant',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [ usersTag ],
      }),
      createUser: builder.mutation({
        query: ( body: any ) => ({
          url: '/users/user',
          method: 'POST',
          body,
        }),
        invalidatesTags: [ usersTag ],
      }),
      deleteUser: builder.mutation({
        query: ( uid: string ) => ({
          url: `/users/${uid}`,
          method: 'DELETE',
        }),
        invalidatesTags: [ usersTag ],
      }),
      updateUser: builder.mutation({
        query: ( body ) => ({
          url: `/users/${body.uid}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: [ usersTag ],
      }),
    }),
  }),

  {
    useGetAllUsersQuery,
    useSetUserTenantMutation,
    useCreateUserMutation,
    useDeleteUserMutation,
    useLazyGetUserDetailsQuery,
    useUpdateUserMutation,
  } = usersRepo;
