/* eslint-disable no-param-reassign */
import { Button, Group, Loader, MultiSelect, Select, Stack, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isEmpty, isFunction, isNil } from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { slugify } from '@uiDomain/domain.helpers';
import * as reactIcons from 'react-icons';
import { useGetActiveEntitiesQuery } from '@uiRepos/entities.repo';
import { IEntity } from '@uiDomain/domain.types';
import { useCreateModuleMutation, useCreateModulePageMutation, useUpdateModuleMutation, useUpdateModulePageMutation } from '@uiRepos/modules.repo';
import { GoCheck } from 'react-icons/go';
import { modals } from '@mantine/modals';
import * as renderers from '@crmComponents/renderers';
import { RENDERER_NAMES } from '@uiDomain/domain.constants';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@uiStore/hooks';

type TModulePage = {
  id: string;
  name: string;
  slug: string;
  description: string;
  pageType: string;
  entities?: string[];
  entityIds?: string[];
  status: boolean;
  iconType: string;
  icon: string;
  order: number;
  module: string;
};

const emptyEntity: TModulePage = {
  id: '',
  slug: '',
  name: '',
  description: '',
  pageType: '',
  entityIds: [],
  iconType: '',
  icon: '',
  status: true,
  order: 0,
  module: '',
};

type TModulePageModalProps = {
  moduleId: string;
  page?: TModulePage;
  // onClose: () => void
};

export const ModulePageModal: FC<TModulePageModalProps> = ({
  moduleId,
  page,
  // onClose,
}) => {
  const { moduleSlug } = useParams();
  const form = useForm<TModulePage>({
    initialValues: isNil( page ) ? emptyEntity : {
      ...page,
      entityIds: page.entities.map(( e: any ) => e.id ),
    },
  });
  const editMode = useMemo(() => !isNil( page ), [ page ]);
  const [ performCreateModulePage, createState ] = useCreateModulePageMutation();
  const [ performUpdateModulePage, updateState ] = useUpdateModulePageMutation();
  const moduleData = useAppSelector(( state ) => ( state as any ).modulesRepo.queries[ `getModuleStructure("${moduleSlug}")` ].data );
  const moduleEntities = moduleData.entities.map(( e: any ) => e.slug );
  const { data: entities } = useGetActiveEntitiesQuery();
  const entitiesData = useMemo(() => entities?.filter(
    ( e: any ) => moduleEntities.includes( e.slug )
  )
    .map(( item: IEntity ) => ({
      value: item.id,
      label: item.name,
    })) || [], [ entities ]);

  const handleFormSubmit = useCallback( async( data: TModulePage ) => {
    // const result: any = null;
    try {
      data.module = moduleId;

      if ( editMode ) {
        await performUpdateModulePage( data );
      } else {
        delete data?.id;
        data.entityIds = [];
        await performCreateModulePage( data );
      }
    } catch ( e: any ) {
      console.error( e.message );
    }
    modals.closeAll();
    // if ( onClose && isFunction( onClose )) {
    //   onClose();
    // }
  }, [ editMode ]);

  return (
    <Stack>
      {!isNil( form.values ) && (
        <form onSubmit={form.onSubmit( handleFormSubmit )}>

          <TextInput
            size="sm"
            mb="md"
            label="Title"
            placeholder="title"
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
            data={Object.keys( renderers ).map(( key: string ) => ({
              label: RENDERER_NAMES[ key ],
              value: key,
            }))}
            placeholder="Page type"
            label="Page type"
            {...form.getInputProps( 'pageType' )}
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
            {...form.getInputProps( 'entityIds' )}
          />

          <Switch
            size="md"
            mb="md"
            label="Enabled"
            checked={form.values?.status}
            {...form.getInputProps( 'status' )}
          />

          <Group justify="end" mt="md">
            {( !updateState.isLoading && !createState.isLoading ) &&
        <Button variant="outline" size="md" type="submit" leftSection={<GoCheck size={20} />}>
          {editMode && <span>Edit</span>}
          {!editMode && <span>Add</span>}
              &nbsp;Module Page
        </Button>
            }
            {( updateState.isLoading || createState.isLoading ) &&
            <Loader size="md" />
            }
          </Group>
        </form>
      )}
      {/* <pre>moduleData: {JSON.stringify( moduleData, null, 2 )}</pre> */}
    </Stack>
  );
};
