import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';

const baseUrl = `${API_BASE_URL}/api/v1/tenanted/records`;

export const
  recordsTag = 'uiRecords',
  recordsRepo: any = createApi({
    reducerPath: 'recordsRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders: ( headers, { getState }) => {
        // const token = ( getState() as RootState ).auth.token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidGVuYW50IjoiYWxwaGEiLCJpZCI6ImIxMDIzZWNiLWIzNWItNDgxMi1iNDY2LTM4ZDQyMjdlN2JhYyIsImlhdCI6MTUxNjIzOTAyMn0.T-wfjZ0uIrNCSH2HpyhFMo5Ev2-XpD1pL_DPPzvyrM4';

        // If we have a token set in state, let's assume that we should be passing it.
        if ( token ) {
          headers.set( 'authorization', `Bearer ${token}` );
        }

        return headers;
      },
    }),
    tagTypes: [ recordsTag ],
    endpoints: ( builder ) => ({
      getRecordsByModule: builder.query({
        query: ( moduleSlug: string ) => ({
          url: `/modules/${moduleSlug}/get-module-data`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
      }),
      createRecord: builder.mutation({
        query: ( body: any ) => ({
          url: '/create-record',
          method: 'POST',
          body,
        }),
        invalidatesTags: [ recordsTag ],
      }),
      updateRecord: builder.mutation({
        query: ({ id, body }: { id: string, body: any }) => ({
          url: `/${id}/update-record`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: [ recordsTag ],
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
    useCreateRecordMutation,
    useGetPageRecordsQuery,
    useRemoveRecordMutation,
    useUpdateRecordMutation,
  } = recordsRepo;
