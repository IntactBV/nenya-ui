'use client';

import { FC } from 'react';
import Link from 'next/link';
import { isEmpty, isNil } from 'lodash';
import { GoAlert, GoCheck, GoPencil, GoTrash } from 'react-icons/go';
import { ActionIcon, Badge, Card, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useDeleteUserMutation } from '@uiRepos/users.repo';

type TUserCardProps = {
  user: any;
  showDelete?: boolean;
  showEdit?: boolean;
  onEdit: ( user: any ) => () => void;
};

export const UserCard: FC<TUserCardProps> = ({
  user,
  showDelete = false,
  showEdit = false,
  onEdit,
}) => {
  const [ performDelete, deleteStatus ] = useDeleteUserMutation();
  const showConfirmModal = ( usr: any ) => () => {
    modals.openConfirmModal({
      title: 'Confirm',
      children: (
        <Text size="sm">
          Please confirm that you want to remove user <b>{usr.name}</b>
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        await performDelete( usr.uid );
        try {
          notifications.show({
            title: 'Users manger',
            message: `The user "${usr.name}" has been removed.`,
            withCloseButton: true,
            color: 'violet',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: 'Records manger',
            message: `Could not remove user "${usr.name}".`,
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
    <Card style={{ opacity: deleteStatus.isLoading ? 0.4 : 1 }} className="ndCard">
      <Stack>
        <Group justify="space-between" align="start">
          <Stack gap="xs">
            <Title order={4}>{user.name}</Title>
            {!isEmpty( user.role ) && (
              <Badge
                radius="xl"
                size="md"
              >{user.role}
              </Badge>
            )}

            {/* <Text>{user.email}</Text> */}

          </Stack>
          {!deleteStatus.isLoading && (
            <Stack>

              <Group gap="xs" className="ndActions">
                {showEdit && (
                  <ActionIcon
                    variant="subtle"
                    onClick={onEdit( user )}
                  >
                    <GoPencil />
                  </ActionIcon>
                )}
                {showDelete && (
                  <ActionIcon
                    variant="subtle"
                    onClick={showConfirmModal( user )}
                  >
                    <GoTrash />
                  </ActionIcon>
                )}
              </Group>
            </Stack>
          )}
          {deleteStatus.isLoading && (
            <Loader variant="oval" size="sm" />
          )}
        </Group>

        {!isNil( user.tenantAccounts ) && (
          <Group>
            {user.tenantAccounts.map(( tenant: any ) => (
              <Link href={`/crm/settings/tenants/${tenant.tenantId}`} key={tenant.tenantId}>
                <Badge
                // src={tenant.logo}
                  radius="xl"
                  size="md"
                >{tenant.tenantName}
                </Badge>
              </Link>
            ))}
          </Group>
        )}
        {/* <Button onClick={() => {
          // currentUser.updateProfile({
          //   displayName: 'Test',
          // }).then(( response: any ) => {
          //   //Success
          //   console.log( response );
          // }, ( error: any ) => {
          //   //Error
          //   console.log( error );
          // });

          performAssingTenant({
            uid: user.uid,
            tenantId: '3e439136-f6c2-4e88-83e7-a592b8ae9db7',
          });
        }}>Assign tenant Alpha
        </Button> */}
      </Stack>
    </Card>
  );
};
