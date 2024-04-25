import { ActionIcon, Badge, Box, Card, Group, Stack, Switch, Text, Title, Tooltip } from '@mantine/core';
import { FC } from 'react';
import { GoPencil, GoX } from 'react-icons/go';
import { AttributeIcon } from '@uiComponents/crm/attributes/AttributeIcon/AttributeIcon';
import { IAttribute } from '@uiDomain/domain.types';
import { useUpdateEntityAttributeMutation } from '@uiRepos/entities.repo';
import { Draggable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { EEntityFieldType } from '@uiDomain/types';
import { useTranslation } from 'react-i18next';
import classes from './DndList.module.css';

type TEntityAttributeCardProps = {
  index: number
  attribute: IAttribute;
  disableEdit?: boolean;
  onRemove: () => void;
  onEdit: () => void;
};

export const EntityAttributeCard: FC<TEntityAttributeCardProps> = ({
  index,
  attribute,
  disableEdit,
  onRemove,
  onEdit,
}) => {
  const { t } = useTranslation();
  const [ updateEntityAttribute ] = useUpdateEntityAttributeMutation();
  const onSwitchChange = ( e: any ) => {
    const data = {
      idEntityAttribute: attribute.entityFieldId,
      body: {
        isMain: e.target.checked,
      },
    };
    updateEntityAttribute( data );
  };
  const onListSwitchChange = ( e: any ) => updateEntityAttribute({
    idEntityAttribute: attribute.entityFieldId,
    body: {
      showInList: e.target.checked,
    },
  });

  return (
    <Draggable key={attribute.id} index={index} draggableId={attribute.id}>
      {( provided2, snapshot ) => (
        <Card
          radius="md"
          withBorder
          py={5}
          px={15}
          className={
            cx({
              ndCard: true,
              [ classes.itemDragging ]: snapshot.isDragging,
              [ classes.entity ]: attribute.fieldType === EEntityFieldType.Entity,
            })
          }
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          ref={provided2.innerRef}
        >
          <Group justify="space-between" align="center">
            <Group style={{ minWidth: '25%' }}>
              <AttributeIcon attributeType={attribute.fieldType === EEntityFieldType.Entity ? '_entity' : attribute.type} />
              <Stack gap={0}>
                <Title order={4}>
                  {t( `${attribute.fieldType === EEntityFieldType.Attribute
                    ? 'attributes'
                    : 'entities'
                  }.names.${attribute.slug}` )}
                </Title>
                <Text size="sm">{attribute.label}</Text>
              </Stack>
              <Badge size="xs" variant="outline">{attribute.slug}</Badge>
            </Group>
            {attribute.relation && (
              <Group>
                <Switch
                  label="Main"
                  checked={attribute.isMain}
                  onChange={onSwitchChange}
                  style={{ cursor: 'pointer' }}
                />
                <Switch
                  label="Show in list"
                  checked={attribute.showInList}
                  disabled={attribute.isMain}
                  onChange={onListSwitchChange}
                  style={{ cursor: 'pointer' }}
                />
              </Group>
            )}
            {!attribute.relation && (
              <Group>
                <Text>Many</Text>
              </Group>
            )}
            <Group className="ndActions">
              <Tooltip label={t( 'attributes.tt.edit' )} position="right" withArrow>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  onClick={onEdit}
                  disabled={disableEdit}
                >
                  <GoPencil size={20} style={{ margin: '.4rem' }} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t( 'attributes.tt.remove' )} position="right" withArrow>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  onClick={onRemove}
                >
                  <GoX size={20} style={{ margin: '.4rem' }} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          {/* <CommonDebugger field="attr" data={attribute} /> */}
        </Card>

      )}
    </Draggable>

  );
};
