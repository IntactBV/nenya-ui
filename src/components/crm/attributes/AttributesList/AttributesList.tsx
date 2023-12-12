import { ActionIcon, Badge, Group, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IAttribute } from '@uiDomain/domain.types';
import { useDeleteAttributeMutation } from '@uiRepos/attributes.repo';
import { FC } from 'react';
import { GoPencil, GoGitCommit, GoTrash, GoCheck } from 'react-icons/go';
import { AttributeModal } from '../AttributeModal/AttributeModal';

interface IAttributesListProps {
  attributes: any[];
}
export const AttributesList: FC<IAttributesListProps> = ({ attributes }) => {
  const [ performDeleteAttribute, deleteState ] = useDeleteAttributeMutation();

  const handleEditClick = ( attribute: IAttribute ) => () => {
    console.log( 'Edit', attribute );
    modals.open({
      id: 'attrModal',
      title: 'Edit attribute',
      children: (
        <AttributeModal
          editMode
          attribute={attribute}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  };

  const handleDeleteClick = ( item: IAttribute ) => () => {
    modals.openConfirmModal({
      title: 'Attributes manager',
      children: (
        <Text size="sm">
                    Please confirm that you want to remove attribute <b>{item.name}</b>
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDeleteAttribute({ id: item.id });
          notifications.show({
            title: 'Attributes manger',
            message: `The attribute "${item.name}" has been removed.`,
            withCloseButton: true,
            color: 'orange',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: 'Attributes manger',
            message: `Could not remove attribute "${item.name}".`,
            withCloseButton: true,
            color: 'red',
            icon: <GoCheck size={20} />,
            radius: 'md',
          });
          console.error( e.message );
        }
      },
    });
  };

  const rows = attributes.map(( item ) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <GoGitCommit size={32} />
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

      <Table.Td width={150} align="center">
        {/* <Select data={attributeTypes} defaultValue={item.type} variant="unstyled" /> */}
        {item.type}
      </Table.Td>
      <Table.Td align="center">{JSON.stringify( item.options )}</Table.Td>
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
          <Tooltip label="Edit attribute" position="left" withArrow color="blue">
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleEditClick( item )}>
              <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remove attribute" position="left" withArrow color="blue">
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
            <th>Attribute</th>
            <th style={{ textAlign: 'center' }}>Type</th>
            <th style={{ textAlign: 'center' }}>Options</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
