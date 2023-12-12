import { Stack } from '@mantine/core';
import { useParams } from 'next/navigation';
import { FC } from 'react';

export const TenantHistoryTab: FC = () => {
  const params = useParams();

  return <Stack>Tenant history {JSON.stringify( params )}</Stack>;
};
