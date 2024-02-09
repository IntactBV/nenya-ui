import { Button, Card, Drawer, Group, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NoData } from '@uiComponents/common/NoData';
import { EEntityFieldType, TEntityAttribute } from '@uiDomain/types';
import { isEmpty, isNil } from 'lodash';
import { FC, useState } from 'react';
import { useAddChildRecordMutation } from '@uiRepos/records.repo';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { GoPlus } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { EntityFieldRenderer } from '@crmComponents/renderers/fields';
import { RecordEditor } from '../RecordEditor/RecordEditor';
import css from '../../renderers/list/BaseTableListRenderer/BaseTableListRenderer.module.css';

type TRecordChildTabProps = {
  record: Record<string, any>;
  attribute: TEntityAttribute;
};

export const RecordChildTab: FC<TRecordChildTabProps> = ({ record, attribute }) => {
  const { t } = useTranslation();
  const [ showDrawer, { toggle: toggleDrawer, close: closeDrawer } ] = useDisclosure( false );
  const [ selectedRecord, setSelectedRecord ] = useState<any>( null );
  const [ performAddChildRecord, addChildStatus ] = useAddChildRecordMutation();
  const { data: entityDetails } = useGetEntityDetailsQuery( attribute.id );
  const handleEditorSave = async( data: any ) => {
    const params = {
      recordId: record.id,
      childEntityId: attribute.id,
      slug: attribute.slug,
      createdBy: 'test',
      data,
    };
    console.log( 'save params', params );
    const result = await performAddChildRecord( params );
    console.log( 'save result', result );
    closeDrawer();
  };

  return (
    <Stack gap="md">
      {isNil( record?.data ) || isEmpty( record.data[ attribute.slug ]) && (
        <NoData
          description="No data to display"
          title="No data"
          buttonLabel="Add data"
          buttonClickHandler={toggleDrawer}
        />
      )}

      {!isNil( record?.data ) && !isEmpty( record.data[ attribute.slug ]) && (
        <Stack>
          <Group justify="space-between" mr="lg">
            <Title>{t( 'records' )}</Title>
            <Button
              variant="outline"
              leftSection={<GoPlus />}
              onClick={toggleDrawer}
            >Add
            </Button>
          </Group>
          {record.data[ attribute.slug ].map(( childRecord: any, index:number ) => (
            <Card key={`${attribute.slug}_card_${index}`} mr="lg" className="ndCard">
              <Stack gap="md">
                {entityDetails?.attributes?.map(( attr: any ) => (
                  <Group gap="sm" key={`content_${index}_${attr.id}`}>
                    <Text fw="bold">{t( `${
                      attr.fieldType === EEntityFieldType.Attribute
                        ? 'attributes'
                        : 'entities'
                    }.names.${attr.slug}` )}
                    </Text>
                    {attr.fieldType === EEntityFieldType.Attribute && (
                      <Text>
                        {childRecord[ attr.slug ]}
                      </Text>
                    )}
                    {attr.fieldType === EEntityFieldType.Entity && (
                      <EntityFieldRenderer field={childRecord[ attr.slug ]} />
                    )}
                  </Group>
                ))}
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      <Drawer
        opened={showDrawer}
        onClose={closeDrawer}
        title={`${isNil( selectedRecord ) ? 'Add' : 'Edit'} ${attribute.name.toLowerCase()}`}
        position="right"
        // className={css.drawer}
      >
        <Stack className={css.body}>
          {attribute.fieldType === EEntityFieldType.Entity && (
            <RecordEditor
              entity={{
                id: attribute.id,
                children: [],
              }}
              record={selectedRecord}
              onEditorSave={handleEditorSave}
              moduleId="1"
            />
          )}

          {attribute.fieldType === EEntityFieldType.Attribute && (
            <Text>TODO: edit attribute</Text>
          )}
        </Stack>
        {/* <ButtonConfigEditor buttonId={buttonId} config={selectedConfig} onClose={handleCloseDrawer} /> */}
      </Drawer>

      {/* <CommonDebugger field="entityDetails" data={entityDetails} /> */}
    </Stack>
  );
};
