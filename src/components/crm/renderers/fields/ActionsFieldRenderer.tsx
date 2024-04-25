import { FC } from 'react';
import Link from 'next/link';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { GoAlert, GoCheck, GoEye, GoPencil, GoTrash } from 'react-icons/go';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRemoveRecordMutation } from '@uiRepos/records.repo';
import { useAppDispatch } from '@uiStore/hooks';
import { setCommonEditedRecord, setCommonPageShowEditDrawer } from '@uiStore/features/common/common.slice';
import { isObject } from 'lodash';
import css from '../../records/RecordsListTable/RecordsListTable.module.css';

export const ActionsFieldRenderer: FC<any> = ({
  field,
}) => {
  const size = 22;
  const dispatch = useAppDispatch();
  const [ performDeleteRecord ] = useRemoveRecordMutation();
  const handleEditClick = () => {
    const props: string[] = Object.keys( field );
    const recordData: Record<string, string> = props.reduce(
      ( acc: Record<string, string>, key: string ) => {
        if ( isObject( field[ key ])) {
          acc[ key ] = field[ key ].id;
          return acc;
        }

        acc[ key ] = field[ key ];

        return acc;
      },
      {}
    );

    dispatch( setCommonEditedRecord( recordData ));
    dispatch( setCommonPageShowEditDrawer( true ));
  };
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
    <Group className={css.recordActions} align="center" justify="end" gap="md">
      <Tooltip label="View record" position="left" withArrow>
        <ActionIcon size={size} variant="transparent" onClick={handleEditClick} className={css.actionBtn}>
          <Link href={`/crm/records/${field.id}`} style={{ padding: 0 }}>
            <GoEye size={size} color="grey" />
          </Link>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Edit record" position="left" withArrow>
        <ActionIcon size={size} variant="subtle" onClick={handleEditClick} className={css.actionBtn}>
          <GoPencil size={size} color="grey" />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete record" position="left" withArrow>
        <ActionIcon size={size} variant="transparent" onClick={handleDeleteClick} className={css.actionBtn}>
          <GoTrash size={size} color="grey" />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
