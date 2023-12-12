'use client';

import { Button, Group, Stack, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FC } from 'react';
import { GoPlus } from 'react-icons/go';
import { ModulePageModal } from '@crmComponents/modules/pages/ModulePageModal';
import { ModulePagesList } from '@crmComponents/modules/pages/ModulePagesList';

type TModulePageTabProps = {
  moduleId: string,
  moduleSlug: string,
  pages: any[]
};

export const ModulePagesTab: FC<TModulePageTabProps> = ({
  moduleId,
  moduleSlug,
  pages,
}) => {
  const handleAddPageClick = () => {
    modals.open({
      id: 'modulePageModal',
      title: 'Add Page',
      children: (
        <ModulePageModal
          moduleId={moduleId}
        />
      ),
    });
  };

  return (
    <Stack>
      <Group justify="space-between" my={20}>
        <Title order={3}>List of pages for {moduleSlug.toUpperCase()} module</Title>
        <Button
          leftSection={<GoPlus size={20} />}
          px={20}
          onClick={handleAddPageClick}
        >
            Add page
        </Button>
      </Group>

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

      <ModulePagesList moduleId={moduleId} pages={pages} />
      {/* <CommonDebugger field="moduleStruct" data={moduleStruct} /> */}
      {/* <pre>{JSON.stringify( entityDetails, null, 2 )}</pre> */}
    </Stack>
  );
};
