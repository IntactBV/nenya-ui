import { Stack } from '@mantine/core';
import { FC } from 'react';
import { useParams } from 'next/navigation';

export const TenantUsersTab: FC = () => {
  const params = useParams();

  return <Stack>Tenant users {JSON.stringify( params )}</Stack>;
};
