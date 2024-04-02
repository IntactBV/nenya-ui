import { useCallback } from 'react';
import { GoAlert } from 'react-icons/go';
import { Loader, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoData } from '@uiComponents/common/NoData';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useGetAllEntitiesQuery } from '@uiRepos/entities.repo';
import { EntitiesList } from '@uiComponents/crm/entities/EntitiesList';
import { EntityModal } from '@uiComponents/crm/entities/EntityModal';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useTranslation } from 'react-i18next';

export const EntitiesScreen = () => {
  const { t } = useTranslation();
  const { data: entities, isLoading, error, isError } = useGetAllEntitiesQuery();

  const handleAddButtonClick = useCallback(( editMode = false ) => {
    modals.open({
      id: 'entityModal',
      title: `${editMode ? 'Edit' : 'Add'} entity`,
      children: (
        <EntityModal
          editMode={editMode}
          onClose={() => {
            modals.closeAll();
          }}
        />
      ),
    });
  }, []);

  if ( isError ) {
    return (
      <Stack align="center" h={600} justify="center">
        <GoAlert size={60} style={{ opacity: 0.5 }} />
        <Title style={{ fontFamily: 'Montserrat' }}>{error.status}</Title>
        <Text>{error.error}</Text>
      </Stack>
    );
  }

  if ( isLoading ) {
    return (
      <CommonPageLoader />
    );
  }

  return (
    <>
      {entities?.length > 0 && (
        <Stack>
          <PageHeader
            title={t( 'entities.plural' )}
            description={t( 'app.settings.admin.entities.description' )}
            buttonLabel={t( 'app.settings.admin.entities.btnAdd' )}
            buttonClickHandler={() => {
              handleAddButtonClick();
            }}
          />
          <EntitiesList entities={entities} />
        </Stack>
      )}
      {entities?.length === 0 && (
        <NoData
          title={t( 'app.settings.admin.entities.noData.title' )}
          description={t( 'app.settings.admin.entities.noData.description' )}
          buttonLabel={t( 'app.settings.admin.entities.noData.btnAdd' )}
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />
      )}

    </>
  );
};
