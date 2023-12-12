'use client';

import { ActionIcon, Box, Group, Loader, SimpleGrid, Stack, Tabs, Title, Tooltip } from '@mantine/core';
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

type TEntityScreenProps = {
  entitySlug: string;
};

export const EntityScreen: FC<TEntityScreenProps> = ({ entitySlug }) => {
  const { data: entityDetails, isLoading, error, isError } = useGetEntityDetailsQuery( entitySlug );

  const handleEditClick = ( entity: IEntity ) => () => {
    console.log( 'Edit', entity );
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
  });

  if ( isLoading ) {
    return (
      <Stack>
        <Group><Loader /></Group>;
      </Stack>
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
        <Tooltip label="Back to entities list" position="left" withArrow color="blue">
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
        <Tooltip label="Entity details" position="right" withArrow color="blue">
          <ActionIcon size="lg" radius="xl" variant="default" onClick={handleEditClick( entityDetails )}>
            <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
          </ActionIcon>
        </Tooltip>
      </Group>
      {entityDetails && (
        <Box>
          <Tabs defaultValue="attributes" orientation="horizontal">
            <Tabs.List mb="lg">
              <Tabs.Tab
                value="attributes"
                leftSection={<GoBeaker />}
              >
              Attributes
              </Tabs.Tab>
              <Tabs.Tab
                value="entities"
                leftSection={<GoBook />}
              >
              Entities
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="attributes">
              <EntityAttributesList entityDetails={entityDetails} />
            </Tabs.Panel>

            <Tabs.Panel value="entities">
              <EntityLinkedEntitiesList entities={entityDetails.entities} />
            </Tabs.Panel>
          </Tabs>
        </Box>
      )}
      {/* <pre>{JSON.stringify( entityDetails, null, 2 )}</pre> */}
    </Stack>
  );
};
