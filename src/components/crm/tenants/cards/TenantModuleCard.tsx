import { Card, Group, Stack, Switch, Text } from '@mantine/core';
import { IModule } from '@uiDomain/domain.types';
import { FC } from 'react';
import { GoDatabase } from 'react-icons/go';
import css from './TenantModuleCard.module.css';

interface IModuleCardProps {
  module: IModule;
  isSelected?: boolean;
  onChange: ( moduleId: string, status: boolean ) => void
}

export const TenantModuleCard: FC<IModuleCardProps> = ({ module, isSelected, onChange }) => (
  <Card
    withBorder
    shadow="md"
    p="md"
    className={`${css.card} ${isSelected ? css.isSelected : ''}`}
  >
    <Card.Section p="sm">
      <Group justify="apart">
        <Group>
          <GoDatabase size={24} />
          <Stack gap={0}>
            <Text className={css.cardTitle} style={{ fontSize: '1.1rem' }}>
              {module.name}
            </Text>
            <Text>{module.slug}</Text>
          </Stack>
        </Group>
        <Switch
          size="lg"
          color="yellow"
          checked={isSelected}
          onChange={() => {
            console.warn( 'switch onChage', module, isSelected );
            onChange( module.id as string, !isSelected );
          }}
        />
      </Group>
    </Card.Section>
  </Card>
);
