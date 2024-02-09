import { Button, Group, Stack, Title } from '@mantine/core';
import { TEntityAttributeBaseProps } from '@uiDomain/types';
import { FC, useCallback, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IAttribute } from '@uiDomain/domain.types';
import { useAssignAttributeToEntityMutation, useRemoveEntityAttributeMutation, useUpdateAttributeOfEntityMutation, useUpdateEntityAttributesOrdersMutation } from '@uiRepos/entities.repo';
import { isEmpty, isNil, sortBy } from 'lodash';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useListState } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [ showAddForm, setShowAddForm ] = useState( false );
  const [ fieldToEdit, setFieldToEdit ] = useState<any>( null );
  const [ performRemoveAttribute ] = useRemoveEntityAttributeMutation();
  const [ performAssignAttributeToEntity ] = useAssignAttributeToEntityMutation();
  const [ performUpdateOrders ] = useUpdateEntityAttributesOrdersMutation();
  const [ performUpdateField ] = useUpdateAttributeOfEntityMutation();
  const [ state, handlers ] = useListState( sortBy( entityDetails.attributes.map( item => ({
    entityFieldId: item.entityFieldId,
    order: item.order,
  })), 'order' ));
  const [ isInitialize, setInitialized ] = useState( false );

  const handleRemoveAttribute = ( attribute: any ) => () => {
    if ( !entityDetails ) {
      return;
    }

    performRemoveAttribute({
      idEntity: entityDetails.id,
      idAttribute: attribute.entityFieldId,
    });
  };

  const handleAddAttribute = () => {
    setShowAddForm( true );
  };

  const handleEditField = useCallback(( attribute: any ) => () => {
    setFieldToEdit( attribute );
  }, []);

  useEffect(() => {
    if ( isEmpty( state )) {
      setShowAddForm( true );
    }
  }, []);

  // useEffect(() => {
  //   if ( !isInitialize ) {
  //     setInitialized( true );
  //     return;
  //   }

  //   const newOrder = state.map(( item, index ) => ({
  //     entityFieldId: item?.entityFieldId,
  //     order: ( index + 1 ) * 10,
  //   }));

  //   state.forEach(( item, index ) => handlers.setItem( index, {
  //     ...item,
  //     order: ( index + 1 ) * 10,
  //   }));

  //   setInitialized( false );
  //   performUpdateOrders( newOrder );
  // }, [ state ]);

  return (
    <Stack gap="md">
      <Title order={3}>
        {t( 'attributes.plural' )}
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
                <div key={`x${index}`}>
                  {( fieldToEdit && fieldToEdit.id === attribute.id ) && (
                    <AddEntityAttributeForm
                      onSubmit={async( params: TEntityAttributeBaseProps ) => {
                        const enhancedParams = {
                          ...params,
                          entityId: entityDetails.id,
                          order: ( state.length + 1 ) * 10,
                        };

                        await performUpdateField( enhancedParams );
                        setFieldToEdit( null );
                      }}
                      onCancel={() => {
                        setFieldToEdit( null );
                      }}
                      attribute={{ ...attribute }}
                    />
                  )}
                  {( !fieldToEdit || fieldToEdit.id !== attribute.id ) && (
                    <EntityAttributeCard
                      key={attribute.id}
                      index={index}
                      attribute={attribute}
                      onRemove={handleRemoveAttribute( attribute )}
                      onEdit={handleEditField( attribute )}
                      disableEdit={!isNil( fieldToEdit )}
                    />
                  )}
                </div>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>

      {showAddForm && (
        <AddEntityAttributeForm
          onSubmit={( params: TEntityAttributeBaseProps ) => {
            const enhancedParams = {
              ...params,
              entityId: entityDetails.id,
              order: ( state.length + 1 ) * 10,
            };
            console.log( '### enhancedParams', enhancedParams );

            performAssignAttributeToEntity( enhancedParams );
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
