import { Stack } from '@mantine/core';
import { IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';

interface ITenantEntityModalProps {
  entity: IEntity;
}

export const TenantEntityModal: FC<ITenantEntityModalProps> = ({
  entity
}) => {
  return (
    <Stack>
      123
      <pre>{JSON.stringify( entity, null, 2 )}</pre>
    </Stack>
  );
}
