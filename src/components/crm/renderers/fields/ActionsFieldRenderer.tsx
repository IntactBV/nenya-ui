import { FC } from 'react';
import Link from 'next/link';
import { ActionIcon, Group, Text } from '@mantine/core';
import { GoAlert, GoCheck, GoTrash } from 'react-icons/go';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRemoveRecordMutation } from '@uiRepos/records.repo';
import css from '../../records/RecordsListTable/RecordsListTable.module.css';

export const ActionsFieldRenderer: FC<any> = ({
  field,
}) => {
  const [ performDeleteRecord ] = useRemoveRecordMutation();
  const handleDeleteClick = () => {
    modals.openConfirmModal({
      title: 'Confirm',
      children: (
        <Text size="sm">
          Please confirm that you want to remove record <b>{field.name}</b>
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDeleteRecord( field.id );
          notifications.show({
            title: 'Records manger',
            message: `The record "${field.name}" has been removed.`,
            withCloseButton: true,
            color: 'violet',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: 'Records manger',
            message: `Could not remove record "${field.name}".`,
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
    <Group className={css.recordActions} align="end" justify="end">
      <ActionIcon size={40} variant="transparent" onClick={handleDeleteClick}>
        <GoTrash size={24} color="grey" />
      </ActionIcon>
    </Group>
  );
};
