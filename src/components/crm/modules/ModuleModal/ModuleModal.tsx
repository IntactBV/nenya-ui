'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { Button, Group, Loader, Stack, Switch, TextInput, MultiSelect, Select } from '@mantine/core';
import { IEntity, IModule } from '@uiDomain/domain.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { isEmpty, isNil } from 'lodash';
import { GoCheck } from 'react-icons/go';
import { useCreateModuleMutation, useUpdateModuleMutation } from '@uiRepos/modules.repo';
import { slugify } from '@uiDomain/domain.helpers';
import { useGetActiveEntitiesQuery } from '@uiRepos/entities.repo';
import * as reactIcons from 'react-icons';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';

interface IModuleModalProps {
  editMode: boolean;
  module?: IModule;
  onClose: () => void
}

const emptyEntity: IModule = {
  id: '',
  slug: '',
  name: '',
  description: '',
  status: true,
};

interface DndListProps {
  data: {
    position: number;
    mass: number;
    symbol: string;
    name: string;
  }[];
}

interface DndListHandleProps {
  data: {
    position: number;
    mass: number;
    symbol: string;
    name: string;
  }[];
}

export const ModuleModal: FC<IModuleModalProps> = ({
  editMode,
  module,
  onClose,
}) => {
  const form = useForm<IModule>({
    initialValues: isNil( module ) ? emptyEntity : {
      ...module,
    },
  });
  const [ performCreateModule, createState ] = useCreateModuleMutation();
  const [ performUpdateModule, updateState ] = useUpdateModuleMutation();

  const { data: entities } = useGetActiveEntitiesQuery();
  const entitiesData = useMemo(() => entities?.map(( item: IEntity ) => ({
    value: item.id,
    label: item.name,
  })) || [], [ entities ]);
  const entitiesObject = useMemo(() => entities?.reduce(( acc: any, item: IEntity ) => {
    acc[ item.id ] = item;
    return acc;
  }, {}), [ entities ]);

  const handleFormSubmit = useCallback( async( data: IModule ) => {
    try {
      let result;
      if ( editMode ) {
        result = await performUpdateModule( data );
      } else {
        delete data?.id;
        result = await performCreateModule( data );
      }

      console.log( '##### result', result );

      notifications.show({
        title: 'Modules manger',
        message: `The module "${data.name}" has been saved.`,
        withCloseButton: true,
        icon: <GoCheck size={20} />,
        radius: 'md',
      });
    } catch ( e: any ) {
      console.error( e.message );
    }
    onClose();
  }, [ editMode, onClose, performCreateModule, performUpdateModule ]);

  const entitiesList = useMemo(() => {
    if ( isNil( entitiesObject ) || isEmpty( entitiesObject )) {
      return [];
    }

    return form.values.entityIds?.map(( eId: string, i: number ) => {
      const entity = entitiesObject[ eId ];
      console.log( 'map entity', entity );
      return {
        position: i,
        symbol: entity.id,
        name: entity.name,
      };
    });
  }, [ entitiesObject, form.values.entityIds ]);

  // useEffect(() => {
  //   if ( createState.isUninitialized || createState.status !== 'fulfilled' ) {
  //     return;
  //   }

  // }, [ createState ]);

  return (
    <Stack>
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>
          <TextInput
            size="sm"
            mb="md"
            label="Name"
            placeholder="name"
            {...form.getInputProps( 'name' )}
            onBlur={( e ) => {
              if ( editMode ) {
                return;
              }

              const slug = slugify( e.target.value );

              form.setValues({ slug });
            }}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Slug"
            placeholder="slug"
            readOnly={editMode}
            disabled={editMode}
            {...form.getInputProps( 'slug' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Description"
            placeholder="description"
            {...form.getInputProps( 'description' )}
          />

          <Select
            mb="md"
            data={reactIcons?.IconsManifest.map(( m:any ) => ({
              label: m.name,
              value: m.id,
            }))}
            placeholder="Icon type"
            label="Icon type"
            {...form.getInputProps( 'iconType' )}
          />

          <TextInput
            size="sm"
            mb="md"
            label="Icon"
            placeholder="icon"
            {...form.getInputProps( 'icon' )}
            onBlur={( e ) => {
              const newIconType = e.target.value.substring( 0, 2 ).toLowerCase();
              console.log( newIconType );
              if ( isEmpty( form.values.iconType ) || form.values.iconType !== newIconType ) {
                form.setValues({
                  iconType: newIconType,
                });
              }
            }}
          />

          <MultiSelect
            mb="md"
            data={entitiesData}
            placeholder="Pick entities"
            label="Entities"
            withAsterisk
            value={form.values?.entityIds}
            {...form.getInputProps( 'entityIds' )}
          />

          <Switch
            size="md"
            mb="md"
            label="Enabled"
            checked={form.values?.status}
            {...form.getInputProps( 'status' )}
          />

          {/* <Card>
        <DndListHandle
          data={entitiesList as any[]}
          onChange={( list: string[]) => {
            console.log( '#### DND changed', list );
            form.setValues({ entityIds: list });
          }}
        />
      </Card> */}

          <Group justify="end" mt="md">
            {( !updateState.isLoading && !createState.isLoading ) &&
        <Button variant="outline" size="md" type="submit" leftSection={<GoCheck size={20} />}>
          {editMode && <span>Edit</span>}
          {!editMode && <span>Add</span>}
              &nbsp;Module
        </Button>
            }
            {( updateState.isLoading || createState.isLoading ) &&
            <Loader size="md" />
            }
          </Group>
          <pre>{JSON.stringify( module, null, 2 )}</pre>
        </form>
      )}
    </Stack>
  );
};
