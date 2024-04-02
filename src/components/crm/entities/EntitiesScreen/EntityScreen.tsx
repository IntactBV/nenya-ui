'use client';

import { ActionIcon, Box, Group, Loader, Stack, Tabs, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { EntityModal } from '@uiComponents/crm/entities/EntityModal';
import { IEntity } from '@uiDomain/domain.types';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { FC, useEffect } from 'react';
import { GoBeaker, GoBook, GoChevronLeft, GoPencil } from 'react-icons/go';
import { EntityAttributesList } from '@uiComponents/crm/entities/EntityAttributesList';
import { $focusedEntityId } from '@uiDomain/signals/common.signals';
import { EntityLinkedEntitiesList } from '@uiComponents/crm/entities/EntityLinkedEntitiesList';
import Link from 'next/link';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';

type TEntityScreenProps = {
  entitySlug: string;
};

export const EntityScreen: FC<TEntityScreenProps> = ({ entitySlug }) => {
  const { data: entityDetails, isLoading, error, isError } = useGetEntityDetailsQuery( entitySlug );

  const handleEditClick = ( entity: IEntity ) => () => {
    modals.open({
      id: 'entityModal',
      title: 'Edit entity',
      children: (
        <EntityModal
          editMode
          entity={entity}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  };

  useEffect(() => {
    $focusedEntityId.value = entitySlug;
  }, []);

  if ( isLoading ) {
    return (
      <CommonPageLoader />
    );
  }

  if ( isError ) {
    return (
      <Stack>
        <Group>{error.message}</Group>;
      </Stack>
    );
  }

  return (
    <Stack w="100%">
      <Group>
        <Tooltip label="Back to entities list" position="left" withArrow>
          <Link href="/crm/settings/entities">
            <GoChevronLeft size="2.125rem" style={{ margin: '.5rem' }} />
          </Link>
        </Tooltip>
        <Stack gap={0}>
          <Title order={2}>
            {entityDetails ? entityDetails.name : 'Entity'}
          </Title>
          <span>Entity details</span>
        </Stack>
        <Tooltip label="Entity details" position="right" withArrow>
          <ActionIcon size="lg" radius="xl" variant="default" onClick={handleEditClick( entityDetails )}>
            <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
          </ActionIcon>
        </Tooltip>
      </Group>
      {entityDetails && (
        <EntityAttributesList entityDetails={entityDetails} />
      )}
      {/* <pre>{JSON.stringify( entityDetails, null, 2 )}</pre> */}
    </Stack>
  );
};
