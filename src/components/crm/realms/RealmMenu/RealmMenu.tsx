import { ActionIcon, Menu, Text } from '@mantine/core';
import { TRealm } from '@uiDomain/types';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { GoAlert, GoCheck, GoEye, GoEyeClosed, GoIssueClosed, GoKebabHorizontal, GoPencil, GoX } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useDeleteRealmMutation } from '@uiRepos/realms.repo';
import { AddRealmModal } from '../modals/AddRealmModal';

type TRealmMenuProps = {
  realm: TRealm;
};

export const RealmMenu: FC<TRealmMenuProps> = ({
  realm,
}) => {
  const { t } = useTranslation();
  const [ performDelete, deleteStatus ] = useDeleteRealmMutation();
  const handleEditClick = useCallback(() => {
    modals.open({
      id: 'editRealmModal',
      title: t( 'app.settings.admin.realms.modalEdit.title' ),
      children: (
        <AddRealmModal
          realm={realm}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  }, [
    realm,
  ]);
  const handleDeleteClick = useCallback(() => {
    modals.openConfirmModal({
      title: t( 'app.settings.admin.realms.notifications.title' ),
      children: (
        <Text size="sm">
          {t( 'app.settings.admin.realms.notifications.confirmDelete' )}
        </Text>
      ),
      labels: { confirm: t( 'buttons.confirm' ), cancel: t( 'buttons.cancel' ) },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDelete( realm.id );
          notifications.show({
            title: t( 'app.settings.admin.realms.notifications.title' ),
            message: t( 'app.settings.admin.realms.notifications.deleted' ),
            withCloseButton: true,
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          console.warn( e );
          notifications.show({
            title: t( 'app.settings.admin.realms.notifications.title' ),
            message: t( 'app.settings.admin.realms.notifications.deleted' ),
            withCloseButton: true,
            icon: <GoAlert size={20} />,
            radius: 'md',
            withBorder: true,
          });
        }
      },
    });
  }, []);

  return (
    <Menu withinPortal position="bottom-end" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <GoKebabHorizontal size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<GoEye size={14} />}>
          <Link href={`/crm/settings/realms/${realm.id}`}>
            {t( 'app.settings.admin.realms.menu.details' )}
          </Link>
        </Menu.Item>
        <Menu.Item leftSection={<GoPencil size={14} />} onClick={handleEditClick}>
          {t( 'app.settings.admin.realms.menu.edit' )}
        </Menu.Item>
        {/* <Menu.Item leftSection={<GoEyeClosed size={14} />} color="red">
          {t( 'app.settings.admin.realms.menu.disable' )}
        </Menu.Item> */}
        <Menu.Item
          leftSection={<GoX size={14} />}
          color="red"
          onClick={handleDeleteClick}
        >
          {t( 'app.settings.admin.realms.menu.delete' )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>

  );
};
