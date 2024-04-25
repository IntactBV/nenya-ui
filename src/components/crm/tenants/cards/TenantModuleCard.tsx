import { Badge, Card, Group, Stack, Switch, Text } from '@mantine/core';
import { IModule } from '@uiDomain/domain.types';
import { FC } from 'react';
import { GoDatabase } from 'react-icons/go';
import { Draggable } from '@hello-pangea/dnd';
import cx from 'clsx';
import css from './TenantModuleCard.module.css';

interface IModuleCardProps {
  module: IModule;
  index: number;
  isSelected?: boolean;
  onChange: ( moduleId: string, status: boolean ) => void
}

export const TenantModuleCard: FC<IModuleCardProps> = ({
  module,
  index,
  isSelected,
  onChange,
}) => (
  <Draggable key={module.id} index={index} draggableId={module.id}>
    {( provided2, snapshot ) => (
      <Card
        withBorder
        shadow="md"
        p="md"
        className={
          cx({
            [ css.card ]: true,
            [ css.isSelected ]: isSelected,
            [ css.itemDragging ]: snapshot.isDragging,
          })
        }
        {...provided2.draggableProps}
        {...provided2.dragHandleProps}
        ref={provided2.innerRef}
      >
        <Card.Section p="sm">
          <Group justify="space-between">
            <Group>
              <GoDatabase size={24} />
              <Stack gap={0}>
                <Text className={css.cardTitle} style={{ fontSize: '1.1rem' }}>
                  {module.name}
                </Text>
                <Text>{module.slug}</Text>
              </Stack>
            </Group>
            <Group>
              {module.entities.map( entity => ( <Badge key={entity.id}>{entity.name}</Badge> ))}
            </Group>
            <Switch
              size="lg"
              checked={isSelected}
              onChange={() => {
                onChange( module.id as string, !isSelected );
              }}
            />
          </Group>
        </Card.Section>
      </Card>
    )}
  </Draggable>
);
