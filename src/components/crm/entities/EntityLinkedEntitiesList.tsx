import { Button, Group, Stack, Title } from '@mantine/core';
import { GoLink } from 'react-icons/go';
import { signal } from '@preact/signals-react';
import { useLinkEntityMutation, useUnlinkEntityMutation } from '@uiRepos/entities.repo';
import { $focusedEntityId } from '@uiDomain/signals/common.signals';
import { IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';
import { LinkEntityForm } from './LinkEntityForm';
import { LinkedEntityCard } from './LinkedEntityCard';

const $showForm = signal<boolean>( false );

type TEntityLinkedEntitiesListProps = {
  entities: IEntity[]
};

export const EntityLinkedEntitiesList: FC<TEntityLinkedEntitiesListProps> = ({
  entities,
}) => {
  const [ requestLinkEntity ] = useLinkEntityMutation();
  const [ requestUnlinkEntity ] = useUnlinkEntityMutation();

  return (
    <Stack>

      <Title order={3}>
            Entities
      </Title>

      {entities.length && entities.map( entity => (
        <LinkedEntityCard
          key={entity.id}
          entity={entity}
          onRemove={() => {
            requestUnlinkEntity({
              idEntity: $focusedEntityId.value,
              idChild: entity.id,
            });
          }}
        />
      ))}

      {$showForm.value && (
        <LinkEntityForm
          onSubmit={async( idChild ) => {
            await requestLinkEntity({
              idEntity: $focusedEntityId.value,
              idChild,
            });
            $showForm.value = false;
          }}
          onCancel={() => {
            $showForm.value = false;
          }}
        />
      )}

      {!$showForm.value && (
        <Group justify="end">
          <Button
            leftSection={<GoLink size={18} />}
            px={30}
            variant="outline"
            onClick={() => {
              // eslint-disable-next-line no-plusplus
              $showForm.value = true;
            }}
          >Link entity
          </Button>
        </Group>
      )}

      <pre>{$showForm.toString()}
        <br />
      </pre>

    </Stack>
  );
};
