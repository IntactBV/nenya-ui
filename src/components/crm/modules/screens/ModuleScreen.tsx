'use client';

import { ActionIcon, Group, Loader, Stack, Tabs, Title, Tooltip } from '@mantine/core';
import { FC, useMemo } from 'react';
import { GoChevronLeft, GoFile, GoPackageDependencies, GoPencil } from 'react-icons/go';
import Link from 'next/link';
import { IModule } from '@uiDomain/domain.types';
import { modals } from '@mantine/modals';
import { ModuleModal } from '@uiComponents/crm/modules/ModuleModal/ModuleModal';
import { useGetModuleStructureQuery } from '@uiRepos/modules.repo';
import { ModulePagesTab } from '@uiComponents/crm/modules/tabs/ModulePagesTab/ModulePagesTab';
import { ModuleEntitiesTab } from '@uiComponents/crm/modules/tabs/ModuleEntitiesTab/ModuleEntitiesTab';

type TModuleScreenProps = {
  moduleSlug: string;
};

type TModuleTab = {
  value: string,
  label: string,
  icon: any,
  panel: any
};

export const ModuleScreen: FC<TModuleScreenProps> = ({ moduleSlug }) => {
  const moduleTabsData: TModuleTab[] = useMemo(() => [ {
    value: 'pages',
    label: 'Pages',
    icon: GoFile,
    panel: ModulePagesTab,
  }, {
    value: 'entities',
    label: 'Entities',
    icon: GoPackageDependencies,
    panel: ModuleEntitiesTab,
  } ], []);

  const handleEditClick = ( module: IModule ) => () => {
    console.log( 'Edit module', module );
    modals.open({
      id: 'entityModal',
      title: 'Edit module',
      children: (
        <ModuleModal
          editMode
          module={module}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  };

  const {
    data: moduleStruct,
    isLoading,
    error,
    isError,
  } = useGetModuleStructureQuery( moduleSlug );

  // useEffect(() => {
  //   $focusedEntityId.value = entitySlug;
  // });

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
    <Stack>
      <Group>
        <Tooltip label="Back to modules list" position="left" withArrow>
          <Link href="/crm/settings/modules">
            <GoChevronLeft size="2.125rem" style={{ margin: '.5rem' }} />
          </Link>
        </Tooltip>
        <Stack gap={0}>
          <Title order={2}>
            {moduleStruct ? moduleStruct.name : 'Module'}
          </Title>
          <span>Module details</span>
        </Stack>
        <Tooltip label="Entity details" position="right" withArrow>
          <ActionIcon size="lg" radius="xl" variant="default" onClick={handleEditClick( moduleStruct )}>
            <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Tabs defaultValue="pages">

        <Tabs.List>
          {moduleTabsData.map( tabData => (
            <Tabs.Tab
              key={tabData.value}
              value={tabData.value}
              // icon={<tabData.icon size="1.2rem" />}
              px="lg"
            >
              {tabData.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {moduleTabsData.map( tabData => {
          const TabPanel = tabData.panel;
          const attributes = {
            [ tabData.value ]: moduleStruct[ tabData.value ],
          };
          return (
            <Tabs.Panel key={tabData.value} value={tabData.value} pt="xs">
              <TabPanel
                module={moduleStruct}
                moduleId={moduleStruct.id}
                moduleSlug={moduleSlug}
                {...attributes}
              />
            </Tabs.Panel>
          );
        })}

      </Tabs>
    </Stack>
  );
};
