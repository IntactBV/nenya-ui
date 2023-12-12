import { ActionIcon, Badge, Group, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';
import { GoPencil, GoGitCommit, GoTrash, GoCheck, GoGitBranch, GoAlert, GoEye } from 'react-icons/go';
import { useDeleteEntityMutation } from '@uiRepos/entities.repo';
import { useRouter } from 'next/navigation';
import { EntityModal } from './EntityModal';

interface IEntitiesListProps {
  entities: any[];
}
export const EntitiesList: FC<IEntitiesListProps> = ({ entities }) => {
  const [ performDeleteEntity, deleteState ] = useDeleteEntityMutation();
  const router = useRouter();

  const handleEditClick = ( entity: IEntity ) => () => {
    console.log( 'Edit', entity );
    modals.open({
      id: 'entityModal',
      title: 'Edit entity',
      children: (
        <EntityModal
          editMode
          entity={entity}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  };

  const handleViewClick = ( entity: IEntity ) => () => {
    console.log( 'View', entity );
    router.push( `/crm/settings/entities/${entity.id}` );
  };

  const handleDeleteClick = ( item: IAttribute ) => () => {
    modals.openConfirmModal({
      title: 'Entities manager',
      children: (
        <Text size="sm">
          Please confirm that you want to remove entity <b>{item.name}</b>
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDeleteEntity({ id: item.id });
          notifications.show({
            title: 'Entities manger',
            message: `The entity "${item.name}" has been removed.`,
            withCloseButton: true,
            color: 'orange',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: 'Entities manger',
            message: `Could not remove entity "${item.name}".`,
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

  const rows = entities.map(( item ) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <GoGitBranch size={30} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td width={150}>
        {item.status ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Disabled
          </Badge>
        )}
      </Table.Td>
      <Table.Td width={220} style={{ textAlign: 'center' }}>
        <Group justify="center">
          <Tooltip label="Entity details" position="left" withArrow color="blue">
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleViewClick( item )}>
              <GoEye size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit entity" position="left" withArrow color="blue">
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleEditClick( item )}>
              <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remove entity" position="left" withArrow color="blue">
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleDeleteClick( item )}>
              <GoTrash size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="md" stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Entity</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Status</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
