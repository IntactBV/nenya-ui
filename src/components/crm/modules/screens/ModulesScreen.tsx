'use client';

import { SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoData } from '@uiComponents/common/NoData';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useCallback } from 'react';
import { GoAlert, GoCheck } from 'react-icons/go';
import { useDeleteModuleMutation, useGetAllModulesQuery } from '@uiRepos/modules.repo';
import { IModule } from '@uiDomain/domain.types';
import { notifications } from '@mantine/notifications';
import { ModuleCard } from '@uiComponents/crm/modules/ModuleCard';
import { ModuleModal } from '@uiComponents/crm/modules/ModuleModal/ModuleModal';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { ModulesFilters } from '@uiComponents/crm/modules/ModulesFilters/ModulesFilters';
import { effect, useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { $modulesFilterName, $modulesFilterTags } from '@uiSignals/modules.signals';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

export const ModulesScreen = () => {
  const { t } = useTranslation();
  const { data: modules, isLoading, error, isError } = useGetAllModulesQuery();
  const [ performDeleteModule ] = useDeleteModuleMutation();
  const $filteredEntities = useSignal<IModule[]>( modules );

  useSignals();

  const handleAddButtonClick = useCallback(( editMode = false, module?: IModule ) => {
    const modalProps = {
      editMode,
      module,
    };
    modals.open({
      id: 'moduleModal',
      title: `${editMode ? 'Edit' : 'Add'} module`,
      children: (
        <ModuleModal
          {...modalProps}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  }, []);

  const handleDeleteButtonClick = useCallback(( module: IModule ) => () => {
    modals.openConfirmModal({
      title: 'Modals manager',
      children: (
        <Text size="sm">
          Please confirm that you want to remove module <b>{module.name}</b>
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDeleteModule({ id: module.id });
          notifications.show({
            title: 'Entities manger',
            message: `The entity "${module.name}" has been removed.`,
            withCloseButton: true,
            color: 'orange',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: 'Entities manger',
            message: `Could not remove entity "${module.name}".`,
            withCloseButton: true,
            color: 'red',
            icon: <GoAlert size={20} />,
            radius: 'md',
          });
          console.error( e.message );
        }
      },
    });
  }, [ performDeleteModule ]);

  effect(() => {
    $filteredEntities.value = modules?.filter(( module: IModule ) => {
      // const name = module.slug;
      const tags = module.tags.map(( tag: string ) => tag.toLowerCase());
      // const type = entity.type.toLowerCase();

      const filterName = $modulesFilterName.value.toLowerCase();
      const filterTags = $modulesFilterTags.value.map(( tag: string ) => tag.toLowerCase());
      // const filterTypes = $attrFilterTypes.value.map(( type: string ) => type.toLowerCase());

      const nameMatch = isEmpty( filterName ) ||
        module.name.includes( filterName ) ||
        module.slug.includes( filterName );

      const tagsMatch = isEmpty( filterTags ) || filterTags.every(
        ( tag: string ) => tags.includes( tag )
      );
      // const typeMatch = isEmpty( filterTypes ) || filterTypes.includes( type );

      return nameMatch && tagsMatch;
    });
  });

  if ( isError ) {
    return (
      <Stack align="center" h={600} justify="center">
        <GoAlert size={60} style={{ opacity: 0.5 }} />
        <Title style={{ fontFamily: 'Montserrat' }}>{error.status}</Title>
        <Text>{error.error}</Text>
      </Stack>
    );
  }

  if ( isLoading ) {
    return (
      <CommonPageLoader />
    );
  }

  return (
    <>
      <Stack>
        <PageHeader
          title="Modules"
          description="List of modules"
          buttonLabel="Add module"
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />

        <ModulesFilters modules={modules} />

        {/* {$filteredEntities.value?.length > 0 && (

          <SimpleGrid
            spacing="lg"
            cols={{
              base: 1,
              sm: 2,
              md: 3,
              lg: 4,
            }}
          >
            {$filteredEntities.value.map(( module: IModule ) => (
              <ModuleCard
                key={module.id}
                module={module}
                onEdit={( moduleToEdit ) => {
                  handleAddButtonClick( true, moduleToEdit );
                }}
                onDelete={
                  handleDeleteButtonClick( module )
                }
              /> ))}
          </SimpleGrid>

        )} */}
        {$filteredEntities.value.map(( module: IModule ) => (
          <ModuleCard
            key={module.id}
            module={module}
            onEdit={( moduleToEdit ) => {
              handleAddButtonClick( true, moduleToEdit );
            }}
            onDelete={
              handleDeleteButtonClick( module )
            }
          /> 
        ))}
        {$filteredEntities.value?.length === 0 && (
          <NoData
            buttonLabel="Add the first module"
            description="No entities found"
            buttonClickHandler={() => {
              handleAddButtonClick();
            }}
          />
        )}
        {/* <CommonDebugger field="modules" data={modules} floating /> */}
      </Stack>

    </>
  );
};
