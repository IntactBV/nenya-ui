'use client';

import { ActionIcon, Card, Group, Stack, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { EntityModal } from '@uiComponents/crm/entities/EntityModal';
import { IEntity } from '@uiDomain/domain.types';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { FC, useEffect } from 'react';
import { GoChevronLeft, GoGitCommit, GoHistory, GoPackageDependencies, GoPackageDependents, GoPencil, GoWorkflow } from 'react-icons/go';
import { EntityAttributesList } from '@uiComponents/crm/entities/EntityAttributesList';
import { $focusedEntityId } from '@uiDomain/signals/common.signals';
import Link from 'next/link';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

type TEntityScreenProps = {
  entitySlug: string;
};

export const EntityScreen: FC<TEntityScreenProps> = ({ entitySlug }) => {
  const { t } = useTranslation();
  const { data: entityDetails, isLoading, error, isError } = useGetEntityDetailsQuery( entitySlug );

  const handleEditClick = ( entity: IEntity ) => () => {
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

  useEffect(() => {
    $focusedEntityId.value = entitySlug;
  }, []);

  if ( isLoading ) {
    return (
      <CommonPageLoader />
    );
  }

  if ( isError ) {
    return (
      <Stack>
        <Group>{error.message}</Group>;
      </Stack>
    );
  }

  return (
    <Stack w="100%">
      <Group>
        <Tooltip label="Back to entities list" position="left" withArrow>
          <Link href="/crm/settings/entities">
            <GoChevronLeft size="2.125rem" style={{ margin: '.5rem' }} />
          </Link>
        </Tooltip>
        <Stack gap={0}>
          <Title order={2}>
            {entityDetails ? entityDetails.name : 'Entity'}
          </Title>
          <span>{t('entities.details')}</span>
        </Stack>
        <Tooltip label={t('entities.edit')} position="right" withArrow>
          <ActionIcon size="lg" radius="xl" variant="default" onClick={handleEditClick( entityDetails )}>
            <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
          </ActionIcon>
        </Tooltip>
      </Group>
      {entityDetails && (
        <EntityAttributesList entityDetails={entityDetails} />
      )}

      {!isEmpty(entityDetails.references) && (
        <Stack gap="md">
          <Title order={3}>
            Referinte
          </Title>
          {entityDetails.references.map(( reference: any ) => (
            <Card 
              key={`reference_${reference.id}`}
              radius="md"
              withBorder
              padding="md"
            >
              <Tooltip label={reference.relation ? 'Relatie directa' : 'Entitate parinte'} position="top-start" withArrow>
              <Group justify="start" gap="xs">
                <Group>
                  {!reference.relation && <GoWorkflow size="2rem" />}
                  {reference.relation && <GoGitCommit size="2rem" />}
                </Group>
                <Stack gap={0}>
                  <Title order={4} fw="bold">{reference.entity?.name}</Title>
                  <small>{reference.entity?.slug}</small>
                </Stack>
              </Group>
              </Tooltip>
            </Card>
          ))}
        </Stack>
      )}

      {/* <CommonDebugger
        data={ entityDetails }
        field='entity'
      /> */}
    </Stack>
  );
};
