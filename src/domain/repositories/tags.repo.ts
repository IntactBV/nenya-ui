import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { prepareHeaders } from './repo.helper';

const baseUrl = `${API_BASE_URL}/api/v1/core/tags`;

export const
  tagsTag = 'uiTags',
  tagsRepo: any = createApi({
    reducerPath: 'tagsRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    tagTypes: [ tagsTag ],
    endpoints: ( builder ) => ({
      getAllTags: builder.query({
        query: () => ({
          url: '',
          method: 'GET',
        }),
        providesTags: [ tagsTag ],
      }),
      createTag: builder.mutation({
        query: ( tag: string ) => ({
          url: '',
          method: 'POST',
          body: {
            id: tag,
          },
        }),
        invalidatesTags: [ tagsTag ],
      }),
      deleteTag: builder.mutation({
        query: ( tag: string ) => ({
          url: `/${tag}`,
          method: 'DELETE',
        }),
        invalidatesTags: [ tagsTag ],
      }),
    }),
  }),

  {
    useGetAllTagsQuery,
    useCreateTagMutation,
    useDeleteTagMutation,
  } = tagsRepo;
