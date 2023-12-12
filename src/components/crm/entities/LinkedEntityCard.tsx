'use client';

import { ActionIcon, Card, Group, Title, Tooltip } from '@mantine/core';
import { IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';
import { GoGitBranch, GoUnlink } from 'react-icons/go';

type TLinkedEntityCardProps = {
  entity: IEntity;
  onRemove: () => void
};

export const LinkedEntityCard:FC<TLinkedEntityCardProps> = ({
  entity,
  onRemove,
}) => (
  <Card radius="md" withBorder py={5} px={15}>
    <Group justify="space-between">
      <Group>
        <GoGitBranch size={20} />
        <Title order={4}>{entity.name}</Title>
      </Group>
      <Tooltip label="Unlink entity" position="right" withArrow color="blue">
        <ActionIcon size="lg" radius="xl" variant="default" onClick={onRemove}>
          <GoUnlink size="2.125rem" style={{ margin: '.4rem' }} />
        </ActionIcon>
      </Tooltip>

    </Group>
  </Card>
);
