'use client';

import { SimpleGrid, Stack } from '@mantine/core';
import { TRealm } from '@uiDomain/types';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { isEmpty } from 'lodash';
import { NoData } from '@uiComponents/common/NoData';
import { modals } from '@mantine/modals';
import { useGetAllRealmsQuery } from '@uiRepos/realms.repo';
import { RealmCard } from '../cards/RealmCard';
import { AddRealmModal } from '../modals/AddRealmModal';

export const RealmsScreen = () => {
  const { t } = useTranslation();
  const {
    data: realms,
    isLoading: realmsLoading,
    error: realmsError,
    isError: realmsHasError,
  } = useGetAllRealmsQuery();

  const handleAddButtonClick = useCallback(() => {
    modals.open({
      id: 'addRealmModal',
      title: t( 'app.settings.admin.realms.modalAdd.title' ),
      children: (
        <AddRealmModal
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  }, []);

  if ( isEmpty( realms )) {
    return (
      <Stack mt="20vh">
        <NoData
          title={t( 'app.settings.admin.realms.noData.title' )}
          description={t( 'app.settings.admin.realms.noData.description' )}
          buttonLabel={t( 'app.settings.admin.realms.btnAdd' )}
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <PageHeader
        title={t( 'app.settings.admin.realms.title' )}
        description={t( 'app.settings.admin.realms.description' )}
        buttonLabel={t( 'app.settings.admin.realms.btnAdd' )}
        buttonClickHandler={() => {
          handleAddButtonClick();
        }}
      />

      <SimpleGrid
        cols={3}
        spacing="lg"
        // breakpoints={[
        //   { maxWidth: '86rem', cols: 2, spacing: 'md' },
        //   { maxWidth: '64rem', cols: 1, spacing: 'sm' },
        // ]}
      >
        {realms.map(( realm: TRealm ) => (
          <RealmCard key={realm.id} realm={realm} />
        ))}
      </SimpleGrid>

    </Stack>
  );
};
