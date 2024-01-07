import { ActionIcon, Box, Card, Group, Switch, Title, Tooltip } from '@mantine/core';
import { FC } from 'react';
import { GoX } from 'react-icons/go';
import { AttributeIcon } from '@uiComponents/crm/attributes/AttributeIcon/AttributeIcon';
import { IAttribute } from '@uiDomain/domain.types';
import { useUpdateEntityAttributeMutation } from '@uiRepos/entities.repo';
import { Draggable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { EEntityFieldType } from '@uiDomain/types';
import classes from './DndList.module.css';

type TEntityAttributeCardProps = {
  index: number
  attribute: IAttribute;
  onRemove: () => void;
};

export const EntityAttributeCard: FC<TEntityAttributeCardProps> = ({
  index,
  attribute,
  onRemove,
}) => {
  const [ updateEntityAttribute ] = useUpdateEntityAttributeMutation();
  // const onSwitchChange = ( e: any ) => updateEntityAttribute({
  //   idEntityAttribute: attribute.entityAttributeId,
  //   body: {
  //     isMain: e.target.checked,
  //   },
  // });

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
              [ classes.itemDragging ]: snapshot.isDragging,
              [ classes.entity ]: attribute.fieldType === EEntityFieldType.Entity,
            })
          }
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          ref={provided2.innerRef}
        >
          <Group justify="space-between" align="center">
            <Group>
              <Tooltip label="Remove attribute" position="right" withArrow>
                <AttributeIcon attributeType={attribute.fieldType === EEntityFieldType.Entity ? '_entity' : attribute.type} />
              </Tooltip>
              <Title order={4}>
                {attribute.name} | {attribute.entityAttributeId}
              </Title>
            </Group>
            <Group>
              {/* <Switch
                label="Main"
                checked={attribute.isMain}
                onChange={onSwitchChange}
                style={{ cursor: 'pointer' }}
              /> */}
              <Tooltip label="Remove attribute" position="right" withArrow>
                <ActionIcon size="lg" radius="xl" variant="default" onClick={onRemove}>
                  <GoX size="2.125rem" style={{ margin: '.4rem' }} />
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
