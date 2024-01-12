'use client';

import { ActionIcon, Button, Chip, Group, MultiSelect, Popover, Select, Stack, Switch, Table, Text, Title } from '@mantine/core';
import { IEntity, IModule } from '@uiDomain/domain.types';
import { useGetActiveEntitiesQuery } from '@uiRepos/entities.repo';
import { FC, useMemo } from 'react';
import { GoTrash } from 'react-icons/go';
import { useRemoveEntityFromModuleMutation } from '@uiRepos/modules.repo';
import { ModuleAddEntityPopover } from './ModuleAddEntityPopover';

type TModulePageTabProps = {
  module: IModule,
  moduleSlug: string
};

export const ModuleEntitiesTab: FC<TModulePageTabProps> = ({ module, moduleSlug }) => {
  const [ performRemoveEntity ] = useRemoveEntityFromModuleMutation();

  const handleRemoveEntity = ( entityId: string ) => () => {
    performRemoveEntity({ moduleId: module.id, entityId });
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3} my="lg">List of entities for {moduleSlug.toUpperCase()} module</Title>
        <ModuleAddEntityPopover module={module} />
      </Group>
      <Table>
        <Table.Thead>
          <Table.Th>Entity</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Attributes</Table.Th>
          <Table.Th w={50}></Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {module.entities.map( entity => (
            <Table.Tr key={`tr_${entity.id}`}>
              <Table.Td>
                <Title order={4}>
                  {entity.name}
                </Title>
              </Table.Td>
              <Table.Td>
                <Text>
                  {entity.description}
                </Text>
              </Table.Td>
              <Table.Td>
                <Switch checked={entity.status} />
              </Table.Td>
              <Table.Td>
                <Chip>{entity.attributes.length}</Chip>
              </Table.Td>
              <Table.Td>
                <ActionIcon
                  variant="subtle"
                  onClick={handleRemoveEntity( entity.id )}
                >
                  <GoTrash />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* {entityDetails && (
        <SimpleGrid
          spacing="xl"
          cols={{
            base: 1,
            md: 2,
          }}
        >
          <EntityAttributesList entityDetails={entityDetails} />
          <EntityLinkedEntitiesList entities={entityDetails.entities} />
        </SimpleGrid>
      )} */}

      {/* <ModulePagesList moduleId={moduleStruct.id} /> */}
      {/* <CommonDebugger field="moduleStruct" data={moduleStruct} /> */}
      {/* <pre>module: {JSON.stringify( module, null, 2 )}</pre> */}
    </Stack>
  );
};
