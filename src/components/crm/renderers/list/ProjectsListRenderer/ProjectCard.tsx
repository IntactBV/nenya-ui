import { EmployeeFieldRenderer, EntityFieldRenderer } from '@crmComponents/renderers/fields';
import { ActionIcon, Card, Group, RingProgress, Stack, Text, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GoAlert, GoCheck, GoPencil, GoTrash } from 'react-icons/go';

type TProjectCardProps = {
  record: any;
  entity: IEntity;
};

export const ProjectCard: FC<TProjectCardProps> = ({
  record,
  entity,
}) => {
  const { t } = useTranslation();
  const onEdit = () => {
    console.log( 'edit' );
  };

  const showConfirmModal = () => {
    modals.openConfirmModal({
      title: t( 'modals.confirm.title' ),
      children: (
        <Text size="sm">
          {t( 'modals.confirm.deleteProject' )}
        </Text>
      ),
      labels: { confirm: t( 'buttons.confirm' ), cancel: t( 'buttons.cancel' ) },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        // await performDelete( usr.uid );
        try {
          notifications.show({
            title: t( 'notifications.projects.title' ),
            message: t( 'notifications.projects.removed' ),
            withCloseButton: true,
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: t( 'notifications.projects.title' ),
            message: t( 'notifications.projects.error' ),
            withCloseButton: true,
            color: 'red',
            icon: <GoAlert size={20} />,
            radius: 'md',
          });
          console.error( e.message );
        }
      },
    });
  };

  return (
    <Card className="ndCard">
      <Group justify="space-between">
        <Group>
          <RingProgress
            size={60}
            thickness={4}
            sections={[ { value: 40, color: 'orange' } ]}
            label={
              <Text fw={200} ta="center" size="sm">
                  40%
              </Text>
            }
          />
          <Title order={3}>{record.name}</Title>
          <EntityFieldRenderer field={record[ 'project-type' ]} />
        </Group>
        <EmployeeFieldRenderer field={record.employee} />
        <Group className="ndActions">
          <ActionIcon
            variant="subtle"
            onClick={onEdit}
          >
            <GoPencil size={20} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            onClick={showConfirmModal}
          >
            <GoTrash size={20} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};
