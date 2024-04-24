'use client';

import { Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoData } from '@uiComponents/common/NoData';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useCallback } from 'react';
import { GoAlert } from 'react-icons/go';
import { useGetAllTenantsQuery } from '@uiRepos/tenants.repo';
import { ITenant } from '@uiDomain/domain.types';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useTranslation } from 'react-i18next';
import { effect, useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { $tenantsFilterName } from '@uiSignals/tenants.signals';
import { isEmpty } from 'lodash';
import { AddTenantModal } from '../AddTenantModal';
import { TenantCard } from '../TenantCard';
import { TenantsFilters } from '../cards/TenantsFilters/TenantsFilters';

export const TenantsScreen = () => {
  // const { data: entities, isLoading, error, isError, isSuccess, isFetching, status } = useGetAllEntitiesQuery();
  const { t } = useTranslation();
  const { data: tenants, isLoading, error, isError } = useGetAllTenantsQuery();
  const $filteredEntities = useSignal<ITenant[]>( tenants );

  const handleAddButtonClick = useCallback(() => {
    modals.open({
      id: 'addTenantModal',
      title: 'Add tenant',
      children: (
        <AddTenantModal
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  }, []);

  useSignals();

  effect(() => {
    $filteredEntities.value = tenants?.filter(( tenant: ITenant ) => {
      // const name = module.slug;
      // const tags = entity.tags.map(( tag: string ) => tag.toLowerCase());
      // const type = entity.type.toLowerCase();

      const filterName = $tenantsFilterName.value.toLowerCase();
      // const filterTags = $attrFilterTags.value.map(( tag: string ) => tag.toLowerCase());
      // const filterTypes = $attrFilterTypes.value.map(( type: string ) => type.toLowerCase());

      const nameMatch = isEmpty( filterName ) ||
        tenant.name.includes( filterName ) ||
        tenant.slug.includes( filterName );

      // const tagsMatch = isEmpty( filterTags ) || filterTags.every(
      //   ( tag: string ) => tags.includes( tag )
      // );
      // const typeMatch = isEmpty( filterTypes ) || filterTypes.includes( type );

      return nameMatch;
    });
  });

  if ( isError ) {
    return (
      <Stack align="center" h={600} justify="center">
        <GoAlert size={60} style={{ opacity: 0.5 }} />
        <Title style={{ fontFamily: 'Montserrat' }}>{error.status}</Title>
        <Text>{error.error}</Text>
      </Stack>
    );
  }

  if ( isLoading ) {
    return (
      <CommonPageLoader message={t( 'loading.tenants' )} />
    );
  }

  return (
    <>
      <Stack>
        <PageHeader
          title={t( 'app.settings.admin.tenants.title' )}
          description={t( 'app.settings.admin.tenants.listDescription' )}
          buttonLabel={t( 'app.settings.admin.tenants.btnAdd' )}
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />

        <TenantsFilters tenants={tenants} />

        {$filteredEntities.value?.length > 0 && (

          <SimpleGrid
            cols={3}
            spacing="lg"
            // breakpoints={[
            //   { maxWidth: '86rem', cols: 2, spacing: 'md' },
            //   { maxWidth: '64rem', cols: 1, spacing: 'sm' },
            // ]}
          >
            {$filteredEntities.value.map(( tenant: ITenant ) => (
              <TenantCard key={tenant.id} tenant={tenant} />
            ))}
          </SimpleGrid>

        )}

        {$filteredEntities.value?.length === 0 && (
          <NoData
            buttonLabel="Add the first tenant"
            description="No tenants found"
            buttonClickHandler={() => {
              handleAddButtonClick();
            }}
          />
        )}
      </Stack>

    </>
  );
};
