'use client';

import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Badge, Group, Pill, ScrollArea, Switch, Table, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IAttribute } from '@uiDomain/domain.types';
import { $attrFilterName, $attrFilterTags, $attrFilterTypes } from '@uiSignals/attributes.signals';
import { useDeleteAttributeMutation } from '@uiRepos/attributes.repo';
import { GoPencil, GoGitCommit, GoTrash, GoCheck } from 'react-icons/go';
import { isEmpty } from 'lodash';
import { effect, useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { AttributeModal } from '../AttributeModal/AttributeModal';
import { AttributesFilters } from '../AttributesFilters/AtributesFilters';

interface IAttributesListProps {
  attributes: any[];
}
export const AttributesList: FC<IAttributesListProps> = ({ attributes }) => {
  const { t } = useTranslation();
  const [ performDeleteAttribute, deleteState ] = useDeleteAttributeMutation();
  const filteredAttributes = useSignal<IAttribute[]>( attributes );

  useSignals();

  effect(() => {
    filteredAttributes.value = attributes.filter(( attribute: IAttribute ) => {
      const name = t( `attributes.names.${attribute.slug}` ) || attribute.slug;
      const tags = attribute.tags.map(( tag: string ) => tag.toLowerCase());
      const type = attribute.type.toLowerCase();

      const filterName = $attrFilterName.value.toLowerCase();
      const filterTags = $attrFilterTags.value.map(( tag: string ) => tag.toLowerCase());
      const filterTypes = $attrFilterTypes.value.map(( type: string ) => type.toLowerCase());

      const nameMatch = isEmpty( filterName ) ||
        name.includes( filterName ) ||
        attribute.slug.includes( filterName );
      const tagsMatch = isEmpty( filterTags ) || filterTags.every(
        ( tag: string ) => tags.includes( tag )
      );
      const typeMatch = isEmpty( filterTypes ) || filterTypes.includes( type );

      return nameMatch && tagsMatch && typeMatch;
    });
  });

  const handleEditClick = ( attribute: IAttribute ) => () => {
    modals.open({
      id: 'attrModal',
      title: `${t( 'edit' )} ${t( 'attribute' )}`,
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
      title: t( 'app.settings.admin.attributes.manager' ),
      children: (
        <Text size="sm">
                    Please confirm that you want to remove attribute <b>{item.name}</b>
        </Text>
      ),
      labels: { confirm: t( 'buttons.confirm' ), cancel: t( 'buttons.cancel' ) },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDeleteAttribute({ id: item.id });
          notifications.show({
            title: t( 'app.settings.admin.attributes.manager' ),
            message: `The attribute "${item.name}" has been removed.`,
            withCloseButton: true,
            color: 'orange',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: t( 'app.settings.admin.attributes.manager' ),
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

  const rows = filteredAttributes.value.map(( item ) => (
    <Table.Tr key={`row_${item.name}`}>
      <Table.Td>
        <Group gap="sm">
          <GoGitCommit size={32} />
          <div>
            <Text fz="sm" fw={500}>
              {t( `attributes.names.${item.slug}` )}
            </Text>
            <Badge size="xs">
              {item.slug}
            </Badge>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        {item.tags.map(( tag: string, tagIndex: number ) => (
          <Badge key={`tag_${tagIndex}`} m={3} variant="light">
            {tag}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td width={150} align="center">
        {/* <Select data={attributeTypes} defaultValue={item.type} variant="unstyled" /> */}
        <Badge variant="outline">
          {t( `attributes.types.${item.type}` )}
        </Badge>
      </Table.Td>
      {/* <Table.Td align="center"></Table.Td> */}
      <Table.Td width={50} align="center">
        <Switch
          checked={item.status}
          onLabel="ON"
          offLabel="OFF"
          readOnly
          size="md"
        />
      </Table.Td>
      <Table.Td width={220} style={{ textAlign: 'center' }}>
        <Group justify="center">
          <Tooltip label="Edit attribute" position="left" withArrow>
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleEditClick( item )}>
              <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remove attribute" position="left" withArrow>
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
      <AttributesFilters attributes={attributes} />
      <Table miw={800} verticalSpacing="md" stickyHeader>
        <Table.Thead style={{
          backgroundColor: 'transparent',
        }}>
          <Table.Tr>
            <th style={{ textAlign: 'left' }}>{t( 'app.settings.admin.attributes.name' )}</th>
            {/* <th style={{ textAlign: 'center' }}>Options</th> */}
            <th style={{ textAlign: 'left' }}>{t( 'app.settings.admin.attributes.tags' )}</th>
            <th style={{ textAlign: 'center' }}>{t( 'app.settings.admin.attributes.type' )}</th>
            <th style={{ textAlign: 'center' }}>{t( 'app.settings.admin.attributes.status' )}</th>
            <th style={{ textAlign: 'center' }}>{t( 'app.settings.admin.attributes.actions' )}</th>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
