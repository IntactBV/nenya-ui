import { ActionIcon, Badge, Group, ScrollArea, Table, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';
import { GoPencil, GoTrash, GoCheck, GoGitBranch, GoAlert, GoEye } from 'react-icons/go';
import { useDeleteEntityMutation } from '@uiRepos/entities.repo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { effect, useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { $entitiesFilterName, $entitiesFilterTags } from '@uiSignals/entities.signals';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { EntityModal } from './EntityModal';
import { EntitiesFilters } from './EntitiesFilters/EntitiesFilters';

interface IEntitiesListProps {
  entities: any[];
}
export const EntitiesList: FC<IEntitiesListProps> = ({ entities }) => {
  const { t } = useTranslation();
  const [ performDeleteEntity, deleteState ] = useDeleteEntityMutation();
  const router = useRouter();
  const filteredEntities = useSignal<IEntity[]>( entities );

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

  const handleDeleteClick = ( item: IEntity ) => () => {
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

  useSignals();

  effect(() => {
    filteredEntities.value = entities.filter(( entity: IEntity ) => {
      const name = t( `attributes.names.${entity.slug}` ) || entity.slug;
      const tags = entity.tags.map(( tag: string ) => tag.toLowerCase());
      // const type = entity.type.toLowerCase();

      const filterName = $entitiesFilterName.value.toLowerCase();
      const filterTags = $entitiesFilterTags.value.map(( tag: string ) => tag.toLowerCase());
      // const filterTypes = $attrFilterTypes.value.map(( type: string ) => type.toLowerCase());

      const nameMatch = isEmpty( filterName ) ||
        name.includes( filterName ) ||
        entity.slug.includes( filterName );
      const tagsMatch = isEmpty( filterTags ) || filterTags.every(
        ( tag: string ) => tags.includes( tag )
      );
      // const typeMatch = isEmpty( filterTypes ) || filterTypes.includes( type );

      console.log('entity', entity.slug, entity.tags, nameMatch, tagsMatch, filterTags);

      return nameMatch && tagsMatch;
    });
  }, [
    entities, 
    $entitiesFilterName.value, 
    $entitiesFilterTags.value 
  ]);

  const rows = filteredEntities.value.map(( item ) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <GoGitBranch size={30} />
          <Link href={`/crm/settings/entities/${item.id}`}>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Link>
          <Text fz="xs" c="dimmed">
            {item.description}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        {item.tags.map(( tag: string, tagIndex: number ) => (
          <Badge key={`tag_${tagIndex}`} m={3} variant="light">
            {tag}
          </Badge>
        ))}
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
          <Tooltip label="Entity details" position="left" withArrow>
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleViewClick( item )}>
              <GoEye size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit entity" position="left" withArrow>
            <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleEditClick( item )}>
              <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remove entity" position="left" withArrow>
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
      <EntitiesFilters entities={entities} />
      <Table miw={800} verticalSpacing="md" stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t( 'entities.singular' )}</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>{t( 'app.settings.admin.attributes.tags' )}</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>{t( 'app.settings.admin.attributes.status' )}</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>{t( 'app.settings.admin.attributes.actions' )}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
