import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { prepareHeaders } from './repo.helper';

const baseUrl = `${API_BASE_URL}/api/v1/core/realms`;

export const
  realmsTag = 'uiRealms',
  realmDetailsTag = 'uiRealmDetails',
  realmsRepo: any = createApi({
    reducerPath: 'realmsRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    tagTypes: [ realmsTag, realmDetailsTag ],
    endpoints: ( builder ) => ({
      getAllRealms: builder.query({
        query: () => ({
          url: '',
          method: 'GET',
        }),
        providesTags: [ realmsTag ],
      }),
      getRealm: builder.query({
        query: ( tenantId ) => ({
          url: `/${tenantId}`,
          method: 'GET',
        }),
        providesTags: [ realmDetailsTag ],
      }),
      createRealm: builder.mutation({
        query: ( data ) => ({
          url: '',
          method: 'POST',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ realmsTag ],
      }),
      updateRealm: builder.mutation({
        query: ( data ) => ({
          url: `/${data.id}`,
          method: 'PATCH',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ realmsTag, realmDetailsTag ],
      }),
      deleteRealm: builder.mutation({
        query: ( id: string ) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [ realmsTag ],
      }),
    }),
  }),

  {
    useGetAllRealmsQuery,
    useGetRealmQuery,
    useCreateRealmMutation,
    useUpdateRealmMutation,
    useDeleteRealmMutation,
  } = realmsRepo;
