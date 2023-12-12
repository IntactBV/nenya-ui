import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';

const baseUrl = `${API_BASE_URL}/api/v1/core`;

export const
  modulesTag = 'uiModules',
  moduleStructTag = 'uiModuleStruct',
  modulesRepo: any = createApi({
    reducerPath: 'modulesRepo',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: [ modulesTag, moduleStructTag ],
    endpoints: ( builder ) => ({
      getAllModules: builder.query({
        query: () => ({
          url: '/modules',
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ modulesTag ],
      }),
      getActiveModules: builder.query({
        query: () => ({
          url: '/modules/active',
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ modulesTag ],
      }),
      getModuleStructure: builder.query({
        query: ( moduleSlug: string ) => ({
          url: `/modules/${moduleSlug}/get-module-structure`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ moduleStructTag ],
        transformResponse: ( response: any ) => {
          if ( response && response.length > 0 ) {
            return response[ 0 ];
          }
          return response;
        },
      }),
      createModule: builder.mutation({
        query: ( data ) => ({
          url: '/modules',
          method: 'POST',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ modulesTag ],
      }),
      updateModule: builder.mutation({
        query: ( data ) => ({
          url: `/modules/${data.id}`,
          method: 'PATCH',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ modulesTag, moduleStructTag ],
      }),
      deleteModule: builder.mutation({
        query: ( data ) => ({
          url: `/modules/${data.id}`,
          method: 'DELETE',
          params: undefined,
          data: undefined,
        }),
        invalidatesTags: [ modulesTag ],
      }),
      createModulePage: builder.mutation({
        query: ( data ) => ({
          url: '/module-pages',
          method: 'POST',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ moduleStructTag ],
      }),
      updateModulePage: builder.mutation({
        query: ( data ) => ({
          url: `/module-pages/${data.id}`,
          method: 'PATCH',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ moduleStructTag ],
      }),
      deleteModulePage: builder.mutation({
        query: ( data ) => ({
          url: `/module-pages/${data.id}/delete-module-page`,
          method: 'DELETE',
          params: undefined,
          data: undefined,
        }),
        invalidatesTags: [ moduleStructTag ],
      }),
      getModulePageDetails: builder.query({
        query: ({
          pageId,
        }: { pageId: string }) => ({
          url: `/module-pages/${pageId}/module-page`,
          method: 'GET',
        }),
        providesTags: [ moduleStructTag ],
        transformResponse: ( response: any ) => {
          if ( response && response.length > 0 ) {
            return response[ 0 ];
          }
          return response;
        },
      }),
    }),
  }),

  {
    useGetAllModulesQuery,
    useGetActiveModulesQuery,
    useGetModuleStructureQuery,
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useCreateModulePageMutation,
    useUpdateModulePageMutation,
    useDeleteModulePageMutation,
    useGetModulePageDetailsQuery,
  } = modulesRepo;
