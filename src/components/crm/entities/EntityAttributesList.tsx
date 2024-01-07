import { Button, Group, Stack, Title } from '@mantine/core';
import { TEntityAttributeBaseProps } from '@uiDomain/types';
import { FC, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IAttribute } from '@uiDomain/domain.types';
import { useAssignAttributeToEntityMutation, useRemoveEntityAttributeMutation, useUpdateEntityAttributesOrdersMutation } from '@uiRepos/entities.repo';
import { isEmpty, sortBy } from 'lodash';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useListState } from '@mantine/hooks';
import { EntityAttributeCard } from './EntityAttributeCard';
import { AddEntityAttributeForm } from './AddEntityAttributeForm';

type TEntityDetails = {
  id: string;
  name: string;
  slug: string;
  description: string;
  attributes: IAttribute[];
};

type TEntityAttributesListProps = {
  entityDetails: TEntityDetails
};

export const EntityAttributesList: FC<TEntityAttributesListProps> = ({ entityDetails }) => {
  const [ showAddForm, setShowAddForm ] = useState( false );
  const [ performRemoveAttribute ] = useRemoveEntityAttributeMutation();
  const [ performAssignAttributeToEntity ] = useAssignAttributeToEntityMutation();
  const [ performUpdateOrders ] = useUpdateEntityAttributesOrdersMutation();
  const [ state, handlers ] = useListState( sortBy( entityDetails.attributes.map( item => ({
    entityAttributeId: item.entityAttributeId,
    order: item.order,
  })), 'order' ));
  const [ isInitialize, setInitialized ] = useState( false );

  const handleRemoveAttribute = ( attribute: any ) => () => {
    if ( !entityDetails ) {
      return;
    }

    performRemoveAttribute({
      idEntity: entityDetails.id,
      idAttribute: attribute.entityAttributeId,
    });
  };

  const handleAddAttribute = () => {
    setShowAddForm( true );
  };

  useEffect(() => {
    if ( isEmpty( state )) {
      setShowAddForm( true );
    }
  }, []);

  useEffect(() => {
    if ( !isInitialize ) {
      setInitialized( true );
      return;
    }

    const newOrder = state.map(( item, index ) => ({
      entityAttributeId: item?.entityAttributeId,
      order: ( index + 1 ) * 10,
    }));

    state.forEach(( item, index ) => handlers.setItem( index, {
      ...item,
      order: ( index + 1 ) * 10,
    }));

    setInitialized( false );
    performUpdateOrders( newOrder );
  }, [ state ]);

  return (
    <Stack gap="md">
      <Title order={3}>
        Attributes
      </Title>

      <DragDropContext
        onDragEnd={async({ destination, source }) => {
          // console.log( '### onDragEnd', source, destination );
          await handlers.reorder({ from: source.index, to: destination?.index || 0 });
        }
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {( provided ) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} gap="lg">
              {entityDetails.attributes.map(( attribute: IAttribute, index: number ) => (
                <EntityAttributeCard
                  key={attribute.id}
                  index={index}
                  attribute={attribute}
                  onRemove={handleRemoveAttribute( attribute )}
                />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>

      {showAddForm && (
        <AddEntityAttributeForm
          onSubmit={( params: TEntityAttributeBaseProps ) => {
            performAssignAttributeToEntity({
              ...params,
              entityId: entityDetails.id,
              order: ( state.length + 1 ) * 10,
            });
            setShowAddForm( false );
          }}
          onCancel={() => {
            setShowAddForm( false );
          }}
        />
      )}

      {!showAddForm && (
        <Group justify="end">
          <Button
            variant="outline"
            leftSection={<GoPlus size={24} />}
            px={30}
            onClick={handleAddAttribute}
          >
          Add attribute
          </Button>
        </Group>
      )}
    </Stack>
  );
};
