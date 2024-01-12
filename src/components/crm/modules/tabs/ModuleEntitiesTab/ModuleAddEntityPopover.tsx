import { Button, Loader, Popover, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IEntity, IModule } from '@uiDomain/domain.types';
import { useGetActiveEntitiesQuery } from '@uiRepos/entities.repo';
import { useAddEntityToModuleMutation } from '@uiRepos/modules.repo';
import { FC, useCallback, useMemo, useState } from 'react';
import { GoPlus } from 'react-icons/go';

type TModuleAddEntityPopoverProps = {
  module: IModule
};

export const ModuleAddEntityPopover: FC<TModuleAddEntityPopoverProps> = ({ module }) => {
  const [ selectedEntity, setSelectedEntity ] = useState<string>( '' );
  const [ isOpen, { toggle: toggleOpen } ] = useDisclosure( false );
  const { data: entities } = useGetActiveEntitiesQuery();
  const [ performAddEntity, addStatus ] = useAddEntityToModuleMutation();
  const entitiesData = useMemo(() => {
    const filteredEntities = entities?.filter(( item: IEntity ) => {
      const entityIds = module.entities.map( e => e.id );
      return !entityIds.includes( item.id );
    });
    return filteredEntities?.map(( item: IEntity ) => ({
      value: item.id,
      label: item.name,
    })) || [];
  }, [ entities ]);

  const handleAddButtonClick = useCallback( async() => {
    await performAddEntity({
      moduleId: module.id,
      entityId: selectedEntity,
    });
    setSelectedEntity( '' );
    toggleOpen();
  }, [ selectedEntity, module.id ]);

  return (
    <Popover
      width={200}
      position="bottom-end"
      offset={0}
      withArrow
      shadow="md"
      opened={isOpen}
    >
      <Popover.Target>
        <Button
          leftSection={<GoPlus size={20} />}
          variant="filled"
          onClick={() => toggleOpen()}
        >Add entity
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        {addStatus.isLoading && (
          <Loader size="lg" />
        )}
        {!addStatus.isLoading && (
          <Stack gap="md">
            <Select
              mb="md"
              data={entitiesData}
              placeholder="Pick entities"
              label="Entities"
              withAsterisk
              value={selectedEntity}
              onChange={( value ) => {
                setSelectedEntity( value );
              }}
            />
            <Button
              leftSection={<GoPlus size={20} />}
              variant="filled"
              onClick={handleAddButtonClick}
            >Add entity
            </Button>
          </Stack>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
