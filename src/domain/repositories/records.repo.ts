import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { isEmpty } from 'lodash';

const baseUrl = `${API_BASE_URL}/api/v1/tenanted/records`;

export const
  recordsTag = 'uiRecords',
  recordDetailsTag = 'uiRecordDetails',
  recordsRepo: any = createApi({
    reducerPath: 'recordsRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders: ( headers, { getState }: { getState: () => any }) => {
        if ( !getState().account ) {
          return null;
        }

        const { user } = getState().account;

        if ( isEmpty( user.accessToken )) {
          return null;
        }

        headers.set( 'authorization', `Bearer ${user.accessToken}` );
        return headers;
      },

      // prepareHeaders: ( headers, { getState }) => {
      //   // const token = ( getState() as RootState ).auth.token
      //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidGVuYW50IjoiYWxwaGEiLCJpZCI6ImIxMDIzZWNiLWIzNWItNDgxMi1iNDY2LTM4ZDQyMjdlN2JhYyIsImlhdCI6MTUxNjIzOTAyMn0.T-wfjZ0uIrNCSH2HpyhFMo5Ev2-XpD1pL_DPPzvyrM4';

      //   // If we have a token set in state, let's assume that we should be passing it.
      //   if ( token ) {
      //     headers.set( 'authorization', `Bearer ${token}` );
      //   }

      //   return headers;
      // },
    }),
    tagTypes: [ recordsTag, recordDetailsTag ],
    endpoints: ( builder ) => ({
      getRecordsByModule: builder.query({
        query: ( moduleSlug: string ) => ({
          url: `/modules/${moduleSlug}/get-module-data`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
      }),

      getRecordDetails: builder.query({
        query: ( recordId: string ) => ({
          url: `${recordId}/record-details`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ recordDetailsTag ],
      }),

      getRecords: builder.query({
        query: ( body: any ) => ({
          url: '/filter-records',
          method: 'POST',
          body,
        }),
        providesTags: [ recordDetailsTag ],
      }),

      createRecord: builder.mutation({
        query: ( body: any ) => ({
          url: '/create-record',
          method: 'POST',
          body,
        }),
        invalidatesTags: [ recordsTag ],
      }),

      filterRecords: builder.mutation({
        query: ( body: any ) => ({
          url: '/filter-records',
          method: 'POST',
          body,
        }),
      }),

      updateRecord: builder.mutation({
        query: ({ id, body }: { id: string, body: any }) => ({
          url: `/${id}/update-record`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: [ recordsTag, recordDetailsTag ],
      }),
      removeRecord: builder.mutation({
        query: ( id: string ) => ({
          url: `/${id}/remove-record`,
          method: 'DELETE',
        }),
        invalidatesTags: [ recordsTag ],
      }),
      getPageRecords: builder.query({
        query: ({ moduleId, entityId }) => ({
          url: `/module/${moduleId}/entity/${entityId}/records-by-module-entity`,
          method: 'GET',
        }),
        providesTags: [ recordsTag ],
      }),
    }),
  }),

  {
    useGetRecordsByModuleQuery,
    useGetRecordDetailsQuery,
    useCreateRecordMutation,
    useGetPageRecordsQuery,
    useRemoveRecordMutation,
    useUpdateRecordMutation,
    useFilterRecordsMutation,
    useGetRecordsQuery,
  } = recordsRepo;
