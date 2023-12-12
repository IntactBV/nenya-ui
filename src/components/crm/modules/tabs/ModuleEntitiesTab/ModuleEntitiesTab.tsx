'use client';

import { Chip, Stack, Switch, Table, Text, Title } from '@mantine/core';
import { IModule } from '@uiDomain/domain.types';
import { FC } from 'react';

type TModulePageTabProps = {
  module: IModule,
  moduleSlug: string
};

export const ModuleEntitiesTab: FC<TModulePageTabProps> = ({ module, moduleSlug }) => {
  const a = 1;

  return (
    <Stack>
      <Table>
        <Table.Thead>
          <Table.Th>Entity</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Attributes</Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {module.entities.map( entity => (
            <Table.Tr>
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
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      entities for {moduleSlug}
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
      <pre>module: {JSON.stringify( module, null, 2 )}</pre>
    </Stack>
  );
};
