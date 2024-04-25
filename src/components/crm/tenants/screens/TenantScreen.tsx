'use client';

import { FC, useCallback } from 'react';
import { GoAlert } from 'react-icons/go';
import { Stack, Text, Title } from '@mantine/core';
import { useGetTenantQuery } from '@uiRepos/tenants.repo';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useParams } from 'next/navigation';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { modals } from '@mantine/modals';
import { TenantTabs } from '../tabs/TenantTabs';
import { AddTenantModal } from '../AddTenantModal';

export const TenantScreen: FC = () => {
  const { tenantId } = useParams();
  const { data: tenantData, isLoading, error, isError } = useGetTenantQuery( tenantId );

  const handleEditButtonClick = useCallback(() => {
    modals.open({
      id: 'addTenantModal',
      title: 'Add tenant',
      children: (
        <AddTenantModal
          tenant={tenantData}
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
      <CommonPageLoader />
    );
  }

  return (
    <Stack>
      <PageHeader
        title={tenantData.name.toUpperCase()}
        description={tenantData.description}
        backButtonUrl="/crm-manager/clients/tenants"
        withEdit
        editButtonClickHandler={handleEditButtonClick}
      />

      <TenantTabs tenant={tenantData} />

      {/* <TenantModuleScreen /> */}

      {/* <CommonDebugger field="tenantData" data={tenantData} floating /> */}
    </Stack>
  );
};
