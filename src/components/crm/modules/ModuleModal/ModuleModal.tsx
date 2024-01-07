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

// export function DndListHandle({ data, onChange }: DndListHandleProps ) {
//   const { classes, cx } = useStyles();
//   const [ state, handlers ] = useListState( data );

//   const items = state.map(( item, index ) => (
//     <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
//       {( provided: any, snapshot: any ) => (
//         <div
//           className={cx( classes.item, { [ classes.itemDragging ]: snapshot.isDragging })}
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//         >
//           <span {...provided.dragHandleProps} className={classes.dragHandle}>
//             <GoGrabber size="1.5em" />
//           </span>
//           <Text className={classes.symbol}>{item.name}</Text>
//           {/* <div>
//             <Text>{item.name}</Text>
//             <Text color="dimmed" size="sm">
//               Position: {item.position} • Mass: {item.mass}
//             </Text>
//           </div> */}
//         </div>
//       )}
//     </Draggable>
//   ));

//   useEffect(() => {
//     if ( isEmpty( state )) {
//       return;
//     }
//     console.log( '##### ordered list ', state );
//     onChange( state.map( s => s.symbol ));
//   }, [ state ]);

//   return (
//     <DragDropContext
//       onDragEnd={async({ destination, source }) => {
//         console.log( 'onDragEnd', destination, source );
//         await handlers.reorder({ from: source.index, to: destination?.index || 0 });
//       }}
//     >
//       <Droppable droppableId="dnd-list" direction="vertical">
//         {( provided, snapshot ) => {
//           console.log( 'Droppable', provided, snapshot );
//           return (
//             <div {...provided.droppableProps} ref={provided.innerRef}>
//               {/* {state.map(( val, index ) => {
//                 return <Box id={val.id} key={index} index={index} title={val.name} className={cx( classes.item, { [ classes.itemDragging ]: snapshot.isDragging })}
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}>
//                   <div {...provided.dragHandleProps} className={classes.dragHandle}>
//                     <GoGrabber size="2em" stroke={1.5} />
//                   </div>
//                   <Text className={classes.symbol}>{val.symbol}</Text>

//                 </Box>
//               })} */}
//               {items}
//               {provided.placeholder}
//             </div>
//           );
//         }}
//       </Droppable>
//     </DragDropContext>
//   );
// }

export const ModuleModal: FC<IModuleModalProps> = ({
  editMode,
  module,
  onClose,
}) => {
  const form = useForm<IModule>({
    initialValues: isNil( module ) ? emptyEntity : {
      ...module,
      entityIds: module?.entities?.map(( e: IEntity ) => e.id ) || [],
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
        </form>
      )}
    </Stack>
  );
};
