'use client';

import { Badge, Group, Stack, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useGetRealmQuery } from '@uiRepos/realms.repo';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GoGlobe } from 'react-icons/go';
import { AddRealmModal } from '../modals/AddRealmModal';

export const RealmScreen = () => {
  const { t } = useTranslation();
  const { realmId } = useParams();
  const { data: realm, isLoading: realmLoading } = useGetRealmQuery( realmId );
  const handleEditButtonClick = useCallback(() => {
    console.log( 'Edit button clicked' );
  }, []);
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

  if ( realmLoading ) {
    return <CommonPageLoader />;
  }

  return (
    <Stack>
      <PageHeader
        title={realm.name.toUpperCase()}
        description={<Badge variant="outline">{realm.slug}</Badge>}
        backButtonUrl="/crm/settings/realms"
        withEdit
        editButtonClickHandler={handleEditClick}
      />

      <p>Description: {realm.description}</p>
      <p>Server: {realm.server}</p>
    </Stack>
  );
};
