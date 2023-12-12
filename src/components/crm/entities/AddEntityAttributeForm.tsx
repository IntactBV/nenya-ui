'use client';

import { ActionIcon, Box, Card, Group, Select, Switch, Tooltip } from '@mantine/core';
import { IAttribute } from '@uiDomain/domain.types';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { FC, useMemo, useState } from 'react';
import { GoCheck, GoX } from 'react-icons/go';
import { isEmpty } from 'lodash';
import { TEntityAttributeBaseProps } from '@uiDomain/types';
import { AttributeIcon } from '../attributes/AttributeIcon/AttributeIcon';

type TAddEntityAttributeFormProps = {
  onSubmit: ( attribute: TEntityAttributeBaseProps ) => void;
  onCancel: () => void;
};

export const AddEntityAttributeForm: FC<TAddEntityAttributeFormProps> =
  ({ onSubmit, onCancel }: any ) => {
    const { data: attributes } = useGetAllAttributesQuery();
    const [ isMain, setIsMain ] = useState( false );
    const attributesData = useMemo(() => attributes?.map(( item: IAttribute ) => ({
      value: item.id,
      label: item.name,
    })) || [], [ attributes ]);
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

    const toggleMain = () => {
      setIsMain( !isMain );
    };

    return (
      <Card radius="md" withBorder padding={20} color="blue" mt="xl">
        <Group justify="space-between">
          <Group>
            <AttributeIcon attributeType={selectedAttribute?.type || ''} />

            <Select
              placeholder="Pick attribute"
              data={attributesData}
              onChange={handleAttributeChange}
            />
          </Group>

          <Switch label="Main" checked={isMain} onChange={toggleMain} />

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
                disabled={
                  isEmpty( selectedAttributeId )
                }
                onClick={() => {
                  onSubmit({
                    attributeId: selectedAttributeId,
                    isMain,
                  });
                }}
              >
                <GoCheck size="2.125rem" style={{ margin: '.5rem' }} />
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
