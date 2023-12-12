import { Loader, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoData } from '@uiComponents/common/NoData';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useCallback } from 'react';
import { GoAlert } from 'react-icons/go';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { AttributeModal } from '@uiComponents/crm/attributes/AttributeModal';
import { AttributesList } from '@uiComponents/crm/attributes/AttributesList';

export const AttributesScreen = () => {
  const { data: attributes, isLoading, error, isError } = useGetAllAttributesQuery();

  const handleAddButtonClick = useCallback(( editMode = false ) => {
    modals.open({
      id: 'attrModal',
      title: `${editMode ? 'Edit' : 'Add'} attribute`,
      children: (
        <AttributeModal
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
      <Stack align="center" h={600} justify="center">
        <Loader size="xl" />
      </Stack>
    );
  }

  return (
    <>
      {attributes?.length > 0 && (
        <Stack>
          <PageHeader
            title="Attributes"
            description="List of attributes"
            buttonLabel="Add attribute"
            buttonClickHandler={() => {
              handleAddButtonClick();
            }}
          />
          <AttributesList attributes={attributes} />
          {/* <CommonDebugger field="attributes" data={attributes} /> */}
        </Stack>
      )}
      {attributes?.length === 0 && (
        <NoData
          buttonLabel="Add the first attribute"
          description="No attributes found"
          buttonClickHandler={() => {
            handleAddButtonClick();
          }}
        />
      )}

    </>
  );
};
