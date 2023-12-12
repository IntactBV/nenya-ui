'use client';

import { ActionIcon, Box, Card, Group, Select, Tooltip } from '@mantine/core';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { FC, useMemo, useState } from 'react';
import { GoCheck, GoX } from 'react-icons/go';
import { isEmpty } from 'lodash';
import { useGetAllEntitiesQuery } from '@uiRepos/entities.repo';
import { $focusedEntityId } from '@uiDomain/signals/common.signals';
import { AttributeIcon } from '../attributes/AttributeIcon/AttributeIcon';

type TAddEntityAttributeFormProps = {
  onSubmit: ( attributeId: string ) => void;
  onCancel: () => void;
};

export const LinkEntityForm: FC<TAddEntityAttributeFormProps> =
  ({ onSubmit, onCancel }: any ) => {
    const { data: entities } = useGetAllEntitiesQuery();
    const attributesData = useMemo(() => {
      const filteredEntities = entities?.filter(
        ( e: { id: string }) => e.id !== $focusedEntityId.value
      ) || [];
      const options = filteredEntities.map(( item: IEntity ) => ({
        value: item.id,
        label: item.name,
      })) || [];
      return options;
    }, [ entities ]);
    const [ selectedEntityId, selectEntityId ] = useState<string>( '1' );
    const selectedEntity = useMemo(() => {
      if ( isEmpty( entities )) {
        return;
      }
      const attr = entities.find(( a: IAttribute ) => ( a.id === selectedEntityId ));
      // eslint-disable-next-line consistent-return
      return attr;
    }, [ selectedEntityId ]);

    const handleAttributeChange = ( id: string | null ) => {
      selectEntityId( id as string );
    };

    return (
      <Card radius="md" withBorder padding={20} color="blue">
        <Group justify="space-between">
          <Group>
            <Select
              placeholder="Select an entity"
              data={attributesData}
              onChange={handleAttributeChange}
              value={selectedEntityId}
            />
          </Group>
          <Group mr={5}>
            <Tooltip label="Add attribute" position="right" withArrow color="blue">
              <ActionIcon
                color="teal"
                size="lg"
                radius="xl"
                variant="default"
                onClick={() => {
                  onSubmit( selectedEntityId );
                }}
              >
                <GoCheck size="2.125rem" color="green" style={{ margin: '.5rem' }} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Cancel" position="right" withArrow color="blue">
              <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={onCancel}>
                <GoX size="2.125rem" style={{ margin: '.5rem' }} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Card>
    );
  };
