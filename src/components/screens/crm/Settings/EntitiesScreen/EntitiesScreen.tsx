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

export const EntitiesScreen = () => {
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
            title="Entities"
            description="List of entities"
            buttonLabel="Add entity"
            buttonClickHandler={() => {
              handleAddButtonClick();
            }}
          />
          <EntitiesList entities={entities} />
        </Stack>
      )}
      {entities?.length === 0 && (
        <NoData
          buttonLabel="Add the first entity"
          description="No entities found"
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />
      )}

    </>
  );
};
