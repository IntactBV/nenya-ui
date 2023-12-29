'use client';

import { ModulePageHeader } from '@crmComponents/modules/pages/ModulePageHeader/ModulePageHeader';
import { Box, Button, Drawer, Group, ScrollArea, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { isEmpty, isNil, isNull } from 'lodash';
import { FC, useCallback, useMemo, useState } from 'react';
import { GoAlert, GoCheck, GoPlus, GoX } from 'react-icons/go';
import { NoData } from '@uiComponents/common/NoData';
import { RecordEditor } from '@crmComponents/records/RecordEditor/RecordEditor';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { useCreateRecordMutation, useGetPageRecordsQuery, useUpdateRecordMutation } from '@uiRepos/records.repo';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { selectAccountEmail } from '@uiStore/features/account/account.selectors';
import { notifications } from '@mantine/notifications';
import { RecordsListTable } from '@crmComponents/records/RecordsListTable/RecordsListTable';
import { selectCommonEditedRecord, selectCommonPageShowEditDrawer } from '@uiStore/features/common/common.selectors';
import { setCommonEditedRecord, setCommonPageShowEditDrawer } from '@uiStore/features/common/common.slice';
import css from './BaseTableListRenderer.module.css';

type TBaseTableListRendererprops = {
  pageData: any;
};

export const BaseTableListRenderer: FC<TBaseTableListRendererprops> = ({ pageData }) => {
  const dispatch = useAppDispatch();
  const showDrawer = useAppSelector( selectCommonPageShowEditDrawer );
  const selectedRecord = useAppSelector( selectCommonEditedRecord );
  const accountEmail = useAppSelector( selectAccountEmail );
  const entity = useMemo(() => pageData.entities[ 0 ] || {}, [ pageData ]);
  const [ createRecord, recordStatus ] = useCreateRecordMutation();
  const [ editRecord, editRecordStatus ] = useUpdateRecordMutation();
  const { data: recordsData, isLoading: recordsLoading, isError } = useGetPageRecordsQuery({
    entityId: entity.id,
    moduleId: pageData.module.id,
  });

  const handleAddEntityBtnClick = useCallback(() => {
    dispatch( setCommonPageShowEditDrawer( true ));
  }, []);

  const handleDrawerClose = useCallback(() => {
    dispatch( setCommonPageShowEditDrawer( false ));
    dispatch( setCommonEditedRecord( null ));
  }, []);

  const handleEditorSave = useCallback( async( data: any ) => {
    try {
      const dto = {
        createdBy: accountEmail,
        module: pageData.module.id,
        entity: entity.id,
        data,
      };
      const editMode = !isNull( selectedRecord );
      const result = editMode
        ? await editRecord({
          id: selectedRecord?.id,
          body: dto,
        })
        : await createRecord( dto );

      if ( !result || !isNil( result.error )) {
        throw new Error( result.error );
      }

      handleDrawerClose();

      notifications.show({
        title: `${pageData.name} manger`,
        message: 'The record has been saved.',
        withCloseButton: true,
        color: 'teal',
        icon: <GoCheck size={20} />,
        radius: 'md',
        withBorder: true,
      });
    } catch ( e ) {
      notifications.show({
        title: `${pageData.name} manger`,
        message: 'The record could not be saved saved.',
        withCloseButton: true,
        color: 'red',
        icon: <GoAlert size={20} />,
        radius: 'md',
        withBorder: true,
      });
      console.error( e );
    }
  }, [ accountEmail, entity, pageData, handleDrawerClose, selectedRecord ]);

  if ( isError ) {
    return (
      <Stack h="100%" justify="center" align="center">
        <Group justify="center" mt={20}>
          <NoData
            title="Could not fetch records"
            description="There was an error fetching records"
          />
        </Group>
      </Stack>
    );
  }

  if ( isEmpty( pageData.entities )) {
    return (
      <Stack h="100%" justify="center" align="center">
        <Group justify="center" mt={20}>
          <NoData
            title="No entities found"
            description="There are no entities for this module page"
          />
        </Group>
      </Stack>
    );
  }

  return (
    <Stack h="100%">

      <ModulePageHeader page={pageData}>
        {!isEmpty( pageData.entities ) && (
          <Button
            variant="gradient"
            size="lg"
            leftSection={<GoPlus size={30} />}
            onClick={handleAddEntityBtnClick}
          >Add {pageData.entities[ 0 ].name.toLowerCase()}
          </Button>
        )}
      </ModulePageHeader>

      {isEmpty( recordsData ) && (
        <Stack h="100%" justify="center" align="center">
          <Group justify="center" mt={20}>
            <NoData
              title="No records found"
              description={`There are no recors defined for ${pageData.entities[ 0 ].name.toLowerCase()} entity`}
              buttonLabel={`Add the first ${pageData.entities[ 0 ].name.toLowerCase()}`}
              buttonClickHandler={handleAddEntityBtnClick}
            />
          </Group>
        </Stack>
      )}
      {!isEmpty( recordsData ) && (
        <ScrollArea h="100%" pt="lg">
          <RecordsListTable records={recordsData} entity={entity} />
        </ScrollArea>
      )}
      {/* <pre>{JSON.stringify( entity, null, 2 )}</pre>
      <pre>{JSON.stringify( recordsData, null, 2 )}</pre> */}

      <Drawer
        opened={showDrawer}
        onClose={handleDrawerClose}
        title={`${isNil( selectedRecord ) ? 'Add' : 'Edit'} ${pageData.entities[ 0 ].name.toLowerCase()}`}
        position="right"
        className={css.drawer}
      >
        <Stack className={css.body}>
          <RecordEditor
            entity={entity}
            record={selectedRecord}
            onEditorSave={handleEditorSave}
            moduleId={pageData.module.id}
          />
        </Stack>
        {/* <ButtonConfigEditor buttonId={buttonId} config={selectedConfig} onClose={handleCloseDrawer} /> */}
      </Drawer>

      {/* <CommonDebugger field="BaseTablelistRenderer::pageData" data={pageData} floating /> */}

    </Stack>
  );
};
