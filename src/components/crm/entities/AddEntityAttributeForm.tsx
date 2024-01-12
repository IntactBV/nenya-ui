'use client';

import { ActionIcon, Box, Card, Group, Select, Switch, Title, Tooltip } from '@mantine/core';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { FC, useMemo, useState } from 'react';
import { GoCheck, GoX } from 'react-icons/go';
import { isEmpty } from 'lodash';
import { EEntityFieldType, TEntityAttributeBaseProps } from '@uiDomain/types';
import { useGetAllEntitiesQuery } from '@uiRepos/entities.repo';
import { AttributeIcon } from '../attributes/AttributeIcon/AttributeIcon';

type TAddEntityAttributeFormProps = {
  onSubmit: ( attribute: TEntityAttributeBaseProps ) => void;
  onCancel: () => void;
};

export const AddEntityAttributeForm: FC<TAddEntityAttributeFormProps> =
  ({ onSubmit, onCancel }: any ) => {
    const { data: attributes } = useGetAllAttributesQuery();
    const { data: entities } = useGetAllEntitiesQuery();

    const [ newAttrType, setNewAttrType ] = useState<EEntityFieldType>(
      EEntityFieldType.Attribute
    );
    // const [ isMain, setIsMain ] = useState( false );
    const attributesData = useMemo(() => attributes?.map(( item: IAttribute ) => ({
      value: item.id,
      label: item.name,
    })) || [], [ attributes ]);
    const entitiesData = useMemo(() => {
      if ( !entities ) {
        return [];
      }
      const options = entities.map(( item: IEntity ) => ({
        value: item.id,
        label: item.name,
      })) || [];
      return options;
    }, [ entities ]);

    const [ selectedEntityId, selectEntityId ] = useState<string>( '' );
    const [ selectedAttributeId, selectAttributeId ] = useState<string>( '' );
    const selectedAttribute = useMemo(() => {
      if ( isEmpty( attributes )) {
        return;
      }
      const attr = attributes.find(( a: IAttribute ) => ( a.id === selectedAttributeId ));
      // eslint-disable-next-line consistent-return
      return attr;
    }, [ selectedAttributeId ]);

    const handleAttributeChange = ( id: string | null ) => {
      selectAttributeId( id as string );
    };

    const handleEntityChange = ( id: string | null ) => {
      selectEntityId( id as string );
    };

    const handleTypeChange = ( type: string | null ) => {
      setNewAttrType( parseInt( type as string, 10 ));
    };

    const handleSave = () => {
      const params: any = {
        fieldType: newAttrType,
      };

      if ( newAttrType === EEntityFieldType.Attribute ) {
        params.attributeFieldId = selectedAttributeId;
      }
      if ( newAttrType === EEntityFieldType.Entity ) {
        params.entityFieldId = selectedEntityId;
      }

      onSubmit( params );
    };

    // const toggleMain = () => {
    //   setIsMain( !isMain );
    // };

    return (
      <Card radius="md" withBorder padding={20} color="blue" mt="xl">
        <Title
          order={3}
          mb="lg"
        >
          Add entity attribute form
        </Title>
        <Group justify="space-between">
          <Group>

            <AttributeIcon attributeType={newAttrType === EEntityFieldType.Entity ? '_entity' : selectedAttribute?.type || ''} />

            <Select
              label="Type"
              placeholder="Pick type"
              data={[
                { label: 'Attribute', value: EEntityFieldType.Attribute.toString() },
                { label: 'Entity', value: EEntityFieldType.Entity.toString() },
              ]}
              w={120}
              value={newAttrType.toString()}
              onChange={handleTypeChange}
            />

            {newAttrType === EEntityFieldType.Attribute && (
              <Select
                label="Attribute"
                placeholder="Pick attribute"
                data={attributesData}
                onChange={handleAttributeChange}
                w={200}
              />
            )}

            {newAttrType === EEntityFieldType.Entity && (
              <Select
                label="Entity"
                placeholder="Pick entity"
                data={entitiesData}
                onChange={handleEntityChange}
                value={selectedEntityId}
                w={200}
              />
            )}

          </Group>

          {/* <Switch label="Main" checked={isMain} onChange={toggleMain} /> */}

          <Group mr={5}>
            <Tooltip
              disabled={
                isEmpty( selectedAttributeId )
              }
              label="Add attribute"
              position="right"
              withArrow
              color="blue"
            >
              <ActionIcon
                color="blue"
                size="lg"
                radius="xl"
                variant="default"
                // disabled={
                //   isEmpty( selectedAttributeId )
                // }
                onClick={handleSave}
              >
                <GoCheck size="2.125rem" style={{ margin: '.5rem' }} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Cancel" position="right" withArrow>
              <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={onCancel}>
                <GoX size="2.125rem" style={{ margin: '.5rem' }} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Card>
    );
  };
