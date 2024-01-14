import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { prepareHeaders } from './repo.helper';

const baseUrl = `${API_BASE_URL}/api/v1/core`;

export const
  tenantsTag = 'uiTenants',
  tenantDetailsTag = 'uiTenantDetails',
  tenantsRepo: any = createApi({
    reducerPath: 'tenantsRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    tagTypes: [ tenantsTag, tenantDetailsTag ],
    endpoints: ( builder ) => ({
      getAllTenants: builder.query({
        query: () => ({
          url: '/tenants',
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ tenantsTag ],
      }),
      getTenant: builder.query({
        query: ( tenantId ) => ({
          url: `/tenants/${tenantId}`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ tenantDetailsTag ],
      }),
      getTenantModules: builder.query({
        query: ( tenantId ) => ({
          url: `/tenants/${tenantId}/tenant-modules`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ tenantDetailsTag ],
      }),
      createTenant: builder.mutation({
        query: ( data ) => ({
          url: '/tenants',
          method: 'POST',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ tenantsTag ],
      }),
      updateTenant: builder.mutation({
        query: ( data ) => ({
          url: `/tenants/${data.id}`,
          method: 'PATCH',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ tenantsTag ],
      }),
      deleteTenant: builder.mutation({
        query: ( data ) => ({
          url: `/tenants/${data.id}`,
          method: 'DELETE',
          params: undefined,
          data: undefined,
        }),
        invalidatesTags: [ tenantsTag ],
      }),
      toggleModuleToTenant: builder.mutation({
        query: ({ tenantId, moduleId, isSelected }) => {
          const body = {
            moduleId,
            isSelected,
          };
          console.warn( 'body', body );
          return {
            url: `/tenants/${tenantId}/toggle-module`,
            method: 'PATCH',
            params: undefined,
            body,
          };
        },
        invalidatesTags: [ tenantsTag, tenantDetailsTag ],
      }),
      updateTenantModulesOrder: builder.mutation({
        query: ({ tenantId, body }) => ({
          url: `/tenants/${tenantId}/update-modules-order`,
          method: 'POST',
          params: undefined,
          body,
        }),
        invalidatesTags: [ tenantsTag, tenantDetailsTag ],
      }),
    }),
  }),

  {
    useGetAllTenantsQuery,
    useGetTenantQuery,
    useGetTenantModulesQuery,
    useLazyGetTenantModulesQuery,
    useCreateTenantMutation,
    useUpdateTenantMutation,
    useDeleteTenantMutation,
    useToggleModuleToTenantMutation,
    useUpdateTenantModulesOrderMutation,
  } = tenantsRepo;
