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
      setUserTenant: builder.mutation({
        query: ( data ) => ({
          url: '/users/user-tenant',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [ usersTag ],
      }),
    }),
  }),

  {
    useGetAllUsersQuery,
    useSetUserTenantMutation,
  } = usersRepo;
