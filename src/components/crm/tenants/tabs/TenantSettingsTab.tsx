import { useParams } from 'next/navigation';
import { Stack } from '@mantine/core';
import { FC } from 'react';

export const TenantSettingsTab: FC = () => {
  const params = useParams();

  return <Stack>Tenant settings {JSON.stringify( params )}</Stack>;
};
