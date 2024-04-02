import { Loader, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoData } from '@uiComponents/common/NoData';
import { PageHeader } from '@uiComponents/common/PageHeader';
import { useCallback } from 'react';
import { GoAlert } from 'react-icons/go';
import { useGetAllAttributesQuery } from '@uiRepos/attributes.repo';
import { AttributeModal } from '@uiComponents/crm/attributes/AttributeModal';
import { AttributesList } from '@uiComponents/crm/attributes/AttributesList';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useTranslation } from 'react-i18next';

export const AttributesScreen = () => {
  const { t } = useTranslation();
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
      <CommonPageLoader />
    );
  }

  return (
    <>
      {attributes?.length > 0 && (
        <Stack>
          <PageHeader
            title={t( 'attributes.plural' )}
            description={t( 'app.settings.admin.attributes.description' )}
            buttonLabel={t( 'app.settings.admin.attributes.btnAdd' )}
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
