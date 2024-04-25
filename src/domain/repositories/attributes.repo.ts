import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { prepareHeaders } from './repo.helper';

const baseUrl = `${API_BASE_URL}/api/v1/core`;

export const
  attrTag = 'uiAttributes',
  attributesRepo: any = createApi({
    reducerPath: 'attributesRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    tagTypes: [ attrTag ],
    endpoints: ( builder ) => ({
      getAllAttributes: builder.query({
        query: () => ({
          url: '/attributes',
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ attrTag ],
      }),
      createAttribute: builder.mutation({
        query: ( data ) => {
          console.log( '[createAttribute] data', data );
          return {
            url: '/attributes',
            method: 'POST',
            params: undefined,
            body: data,
          };
        },
        invalidatesTags: [ attrTag ],
      }),
      updateAttribute: builder.mutation({
        query: ( data ) => ({
          url: `/attributes/${data.id}`,
          method: 'PATCH',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ attrTag ],
      }),
      deleteAttribute: builder.mutation({
        query: ( data ) => ({
          url: `/attributes/${data.id}`,
          method: 'DELETE',
          params: undefined,
          data: undefined,
        }),
        invalidatesTags: [ attrTag ],
      }),
    }),
  }),

  {
    useGetAllAttributesQuery,
    useCreateAttributeMutation,
    useUpdateAttributeMutation,
    useDeleteAttributeMutation,
  } = attributesRepo;
