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
import { AddTenantModal } from '../AddTenantModal';
import { TenantCard } from '../TenantCard';

export const TenantsScreen = () => {
  // const { data: entities, isLoading, error, isError, isSuccess, isFetching, status } = useGetAllEntitiesQuery();
  const { t } = useTranslation();
  const { data: tenants, isLoading, error, isError } = useGetAllTenantsQuery();

  const handleAddButtonClick = useCallback(( editMode = false ) => {
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
      {tenants?.length > 0 && (
        <Stack>
          <PageHeader
            title="Tenants"
            description="List of tenants"
            buttonLabel="Add tenant"
            buttonClickHandler={() => {
              handleAddButtonClick();
            }}
          />

          <SimpleGrid
            cols={3}
            spacing="lg"
            // breakpoints={[
            //   { maxWidth: '86rem', cols: 2, spacing: 'md' },
            //   { maxWidth: '64rem', cols: 1, spacing: 'sm' },
            // ]}
          >
            {tenants.map(( tenant: ITenant ) => ( <TenantCard key={tenant.id} tenant={tenant} /> ))}
          </SimpleGrid>

          {/* <CommonDebugger field="tenants" data={tenants} /> */}
        </Stack>
      )}
      {tenants?.length === 0 && (
        <NoData
          buttonLabel="Add the first tenant"
          description="No tenants found"
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />
      )}

    </>
  );
};
