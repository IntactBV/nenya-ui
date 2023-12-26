'use client';

import { FC } from 'react';
import { GoAlert } from 'react-icons/go';
import { Loader, Stack, Text, Title } from '@mantine/core';
import { useGetTenantQuery } from '@uiRepos/tenants.repo';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useParams } from 'next/navigation';
import { TenantTabs } from '../tabs/TenantTabs';

export const TenantScreen: FC = () => {
  const { tenantId } = useParams();
  const { data: tenantData, isLoading, error, isError } = useGetTenantQuery( tenantId );

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
      <Stack align="center" h={600} justify="center">
        <Loader size="xl" />
      </Stack>
    );
  }

  return (
    <Stack>
      <PageHeader
        title={tenantData.name.toUpperCase()}
        description={tenantData.description}
        backButtonUrl="/crm-manager/clients/tenants"
      />

      <TenantTabs tenant={tenantData} />

      {/* <TenantModuleScreen /> */}

      {/* <CommonDebugger field="tenantData" data={tenantData} floating /> */}
    </Stack>
  );
};
