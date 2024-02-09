'use client';

import { ActionIcon, Card, Group, Select, Stack, Switch, TextInput, Title, Tooltip } from '@mantine/core';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { FC, useCallback, useMemo, useState } from 'react';
import { GoCheck, GoX } from 'react-icons/go';
import { isEmpty } from 'lodash';
import { EEntityFieldType, TEntityAttributeBaseProps } from '@uiDomain/types';
import { useGetAllEntitiesQuery } from '@uiRepos/entities.repo';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { AttributeIcon } from '../attributes/AttributeIcon/AttributeIcon';

type TAddEntityAttributeFormProps = {
  attribute?: IAttribute;
  onSubmit: ( attribute: TEntityAttributeBaseProps ) => void;
  onCancel: () => void;
};

export const AddEntityAttributeForm: FC<TAddEntityAttributeFormProps> = ({
  attribute,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [ fieldLabel, setFieldLabel ] = useState<string>(
    isEmpty( attribute )
      ? ''
      : attribute?.label || ''
  );
  const { data: attributes } = useGetAllAttributesQuery();
  const { data: entities } = useGetAllEntitiesQuery();
  const [ relation, { toggle: toggleRelation } ] = useDisclosure(
    isEmpty( attribute )
      ? true
      : attribute.relation
  );
  const editMode = useMemo(() => !isEmpty( attribute ), [ attribute ]);

  const [ newAttrType, setNewAttrType ] = useState<EEntityFieldType>(
    isEmpty( attribute ) ? EEntityFieldType.Attribute : attribute.fieldType ||
    EEntityFieldType.Attribute
  );
    // const [ isMain, setIsMain ] = useState( false );
  const attributesData = useMemo(() => attributes?.map(( item: IAttribute ) => ({
    value: item.id,
    label: t( `attributes.names.${item.slug}` ),
  })) || [], [ attributes ]);
  const entitiesData = useMemo(() => {
    if ( !entities ) {
      return [];
    }
    const options = entities.map(( item: IEntity ) => ({
      value: item.id,
      label: t( `entities.names.${item.slug}` ),
    })) || [];
    return options;
  }, [ entities ]);

  const [ selectedEntityId, selectEntityId ] = useState<string>( isEmpty( attribute ) ? '' : attribute.id );
  const [ selectedAttributeId, selectAttributeId ] = useState<string>( '' );
  const selectedAttribute = useMemo(() => {
    if ( isEmpty( attributes )) {
      return;
    }
    const attr = attributes.find(( a: IAttribute ) => ( a.id === selectedAttributeId ));
    setFieldLabel( t( `attributes.names.${attr?.slug}` ));
    // eslint-disable-next-line consistent-return
    return attr;
  }, [ selectedAttributeId ]);

  const handleAttributeChange = useCallback(( id: string | null ) => {
    selectAttributeId( id as string );
  }, [ selectedAttribute ]);

  const handleEntityChange = ( id: string | null ) => {
    selectEntityId( id as string );
    const entity = entities?.find(( e: IEntity ) => ( e.id === id ));
    setFieldLabel( t( `entities.names.${entity?.slug}` ));
  };

  const handleTypeChange = ( type: string | null ) => {
    setNewAttrType( parseInt( type as string, 10 ));
  };

  const handleSave = useCallback(() => {
    const params: any = {
      fieldType: newAttrType,
      label: fieldLabel,
      relation,
    };

    if ( editMode ) {
      params.fieldId = attribute?.entityFieldId;
    }

    if ( newAttrType === EEntityFieldType.Attribute ) {
      params.attributeFieldId = selectedAttributeId;
    }

    if ( newAttrType === EEntityFieldType.Entity ) {
      params.entityFieldId = selectedEntityId;
    }

    onSubmit( params );
  }, [ newAttrType, relation, selectedAttributeId, selectedEntityId, onSubmit, fieldLabel ]);

  // const toggleMain = () => {
  //   setIsMain( !isMain );
  // };

  return (
    <Card
      radius="md"
      withBorder
      padding={20}
      color="blue"
      mt="xl"
      className="ndCard"
    >
      <Stack gap="md">
        <Title
          order={3}
        >
          {editMode
            ? t( 'entities.cards.editField.title' )
            : t( 'entities.cards.addField.title' )
          }
        </Title>
        <Group justify="space-between">
          <Group>

            <AttributeIcon attributeType={newAttrType === EEntityFieldType.Entity ? '_entity' : selectedAttribute?.type || ''} />

            <Select
              label={t( 'fields.type' )}
              placeholder="Pick type"
              data={[
                { label: t( 'attributes.singular' ), value: EEntityFieldType.Attribute.toString() },
                { label: t( 'entities.singular' ), value: EEntityFieldType.Entity.toString() },
                { label: t( 'derived.singular' ), value: EEntityFieldType.Derived.toString() },
              ]}
              w={120}
              value={newAttrType.toString()}
              onChange={handleTypeChange}
              disabled={editMode}
            />

            {newAttrType === EEntityFieldType.Attribute && (
              <Select
                label={t( 'attributes.singular' )}
                placeholder={t( 'attributes.select.placeholder' )}
                data={attributesData}
                onChange={handleAttributeChange}
                w={200}
                disabled={editMode}
              />
            )}

            {newAttrType === EEntityFieldType.Entity && (
              <Group gap="md">
                <Select
                  label="Entity"
                  placeholder="Pick entity"
                  data={entitiesData}
                  onChange={handleEntityChange}
                  value={selectedEntityId}
                  w={200}
                  disabled={editMode}
                />
                <Switch
                  size="xl"
                  onLabel="One"
                  offLabel="More"
                  checked={relation}
                  disabled={editMode}
                  onChange={() => {
                    toggleRelation();
                  }} />
              </Group>
            )}

          </Group>

          <Group mr={5}>
            <Tooltip
              disabled={
                isEmpty( selectedAttributeId )
              }
              label="Add attribute"
              position="right"
              withArrow
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
        <Group>
          <TextInput
            label={t( 'fields.label' )}
            placeholder={t( 'fields.label' )}
            w={200}
            value={fieldLabel}
            onChange={( event ) => {
              setFieldLabel( event.currentTarget.value );
            }}
          />
        </Group>
      </Stack>
    </Card>
  );
};
