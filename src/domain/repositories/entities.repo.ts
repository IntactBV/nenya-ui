import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@uiDomain/domain.constants';
import { prepareHeaders } from './repo.helper';

const baseUrl = `${API_BASE_URL}/api/v1/core`;

export const
  entitiesTag = 'uiEntities',
  entityTag = 'uiEntity',
  entitiesRepo: any = createApi({
    reducerPath: 'entitiesRepo',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    tagTypes: [ entitiesTag, entityTag ],
    endpoints: ( builder ) => ({

      getAllEntities: builder.query({
        query: () => ({
          url: '/entities',
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ entitiesTag ],
      }),

      getActiveEntities: builder.query({
        query: () => ({
          url: '/entities/active',
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ entitiesTag ],
      }),

      createEntity: builder.mutation({
        query: ( data ) => {
          console.log( '[createAttribute] data', data );
          return {
            url: '/entities',
            method: 'POST',
            params: undefined,
            body: data,
          };
        },
        invalidatesTags: [ entitiesTag ],
      }),

      updateEntity: builder.mutation({
        query: ( data ) => ({
          url: `/entities/${data.id}`,
          method: 'PATCH',
          params: undefined,
          body: data,
        }),
        invalidatesTags: [ entitiesTag ],
      }),

      deleteEntity: builder.mutation({
        query: ( data ) => ({
          url: `/entities/${data.id}`,
          method: 'DELETE',
          params: undefined,
          data: undefined,
        }),
        invalidatesTags: [ entitiesTag ],
      }),

      removeEntityAttribute: builder.mutation({
        query: ( data ) => ({
          url: `/entities/${data.idEntity}/attributes/${data.idAttribute}/remove-entity-attribute`,
          method: 'DELETE',
          params: undefined,
          data: undefined,
        }),
        invalidatesTags: [ entityTag ],
      }),

      getEntityDetails: builder.query({
        query: ( entitySlug ) => ({
          url: `/entities/${entitySlug}/entity-details`,
          method: 'GET',
          data: undefined,
          params: undefined,
        }),
        providesTags: [ entityTag ],
      }),

      assignAttributeToEntity: builder.mutation({
        query: ( body ) => ({
          url: '/entities/assign-attribute-to-entity',
          method: 'POST',
          body,
        }),
        invalidatesTags: [ entityTag ],
      }),

      updateAttributeOfEntity: builder.mutation({
        query: ( body ) => ({
          url: '/entities/fields/field-of-entity',
          method: 'PATCH',
          body,
        }),
        invalidatesTags: [ entityTag ],
      }),

      linkEntity: builder.mutation({
        query: ( data: { idEntity:string, idChild: string }) => ({
          url: `/entities/${data.idEntity}/entity/${data.idChild}/link-entity`,
          method: 'POST',
          params: undefined,
          body: undefined,
        }),
        invalidatesTags: [ entityTag, entitiesTag ],
      }),

      unlinkEntity: builder.mutation({
        query: ( data: { idEntity:string, idChild: string }) => ({
          url: `/entities/${data.idEntity}/entity/${data.idChild}/unlink-entity`,
          method: 'DELETE',
          params: undefined,
          body: undefined,
        }),
        invalidatesTags: [ entityTag, entitiesTag ],
      }),

      updateEntityAttribute: builder.mutation({
        query: ( data: { idEntityAttribute:string, body: any }) => ({
          url: `/entities/entity-attribute/${data.idEntityAttribute}/update-entity-attribute`,
          method: 'POST',
          body: data.body,
        }),
        invalidatesTags: [ entityTag ],
      }),

      updateEntityAttributesOrders: builder.mutation({
        query: ( body: any ) => ({
          url: '/entities/update-entity-attributes-orders',
          method: 'POST',
          body,
        }),
        invalidatesTags: [ entityTag ],
      }),
    }),
  }),

  {
    useGetAllEntitiesQuery,
    useGetActiveEntitiesQuery,
    useCreateEntityMutation,
    useUpdateEntityMutation,
    useDeleteEntityMutation,
    useRemoveEntityAttributeMutation,
    useAssignAttributeToEntityMutation,
    useGetEntityDetailsQuery,
    useLinkEntityMutation,
    useUnlinkEntityMutation,
    useUpdateEntityAttributeMutation,
    useUpdateEntityAttributesOrdersMutation,
    useUpdateAttributeOfEntityMutation,
  } = entitiesRepo;
