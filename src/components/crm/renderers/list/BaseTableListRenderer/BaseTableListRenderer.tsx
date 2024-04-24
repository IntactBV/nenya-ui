/* eslint-disable no-continue */

'use client';

import { ModulePageHeader } from '@crmComponents/modules/pages/ModulePageHeader/ModulePageHeader';
import { Box, Button, Drawer, Group, ScrollArea, Stack } from '@mantine/core';
import { isEmpty, isNil, isNull } from 'lodash';
import { FC, useCallback, useMemo, useState } from 'react';
import { GoAlert, GoCheck, GoPlus, GoX } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { NoData } from '@uiComponents/common/NoData';
import { RecordEditor } from '@crmComponents/records/RecordEditor/RecordEditor';
import { useCreateRecordMutation, useGetPageRecordsQuery, useSetRecordParentMutation, useUpdateRecordMutation } from '@uiRepos/records.repo';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { selectAccountEmail } from '@uiStore/features/account/account.selectors';
import { notifications } from '@mantine/notifications';
import { RecordsListTable } from '@crmComponents/records/RecordsListTable/RecordsListTable';
import { selectCommnFilters, selectCommonEditedRecord, selectCommonPageShowEditDrawer } from '@uiStore/features/common/common.selectors';
import { setCommonEditedRecord, setCommonPageShowEditDrawer } from '@uiStore/features/common/common.slice';
import { RecordsListFilters } from '@crmComponents/records/RecordsListFilters/RecordsListFilters';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { EEntityFieldType } from '@uiDomain/types';
import css from './BaseTableListRenderer.module.css';

type TBaseTableListRendererprops = {
  pageData: any;
};

export const BaseTableListRenderer: FC<TBaseTableListRendererprops> = ({ pageData }) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const showDrawer = useAppSelector( selectCommonPageShowEditDrawer );
  const selectedRecord = useAppSelector( selectCommonEditedRecord );
  const commonFilters = useAppSelector( selectCommnFilters );
  const accountEmail = useAppSelector( selectAccountEmail );
  const entity = useMemo(() => pageData.entities[ 0 ] || {}, [ pageData ]);
  const [ createRecord ] = useCreateRecordMutation();
  const [ editRecord ] = useUpdateRecordMutation();
  const [ setRecordParent ] = useSetRecordParentMutation();
  const { data: recordsData, isLoading: recordsLoading, isError } = useGetPageRecordsQuery({
    entityId: entity.id,
    moduleId: pageData.module.id,
  });
  const {
    data: entityDetails,
    isLoading: attributesLoading,
    isError: attributesHasError,
    error: attributesError,
  } = useGetEntityDetailsQuery( entity.id );

  const filteredData = useMemo(() => {
    if ( !recordsData ) {
      return [];
    }

    return recordsData.filter(( record: any ) => {
      let found = true;

      if ( !entityDetails?.attributes ) {
        return true;
      }

      for ( const attr of entityDetails.attributes ) {
        let queryFound = false;

        if ( isEmpty( commonFilters.query )) {
          queryFound = true;
        } else if ( !isEmpty( commonFilters.query )
          && !isEmpty( record[ attr.slug ])
          && record[ attr.slug ]?.toLowerCase().includes( commonFilters.query.toLowerCase())
        ) {
          queryFound = true;
        }

        if ( !queryFound ) {
          found = false;
          continue;
        }

        const entityKeys: string[] = [];

        for ( const entityAttr of entityDetails.attributes ) {
          if ( entityAttr.fieldType === EEntityFieldType.Entity ) {
            entityKeys.push( entityAttr.slug );
          }
        }

        if ( isEmpty( entityKeys )) {
          return queryFound;
        }

        let entityFound = true;

        for ( const key of entityKeys ) {
          if ( isEmpty( commonFilters[ key ])) {
            continue;
          }

          if ( record[ key ] !== commonFilters[ key ]) {
            entityFound = false;
          }
        }

        if ( queryFound && entityFound ) {
          return true;
        }

        found = false;
      }

      return found;
    });
  }, [ recordsData, commonFilters, pageData, entityDetails ]);

  const handleAddEntityBtnClick = useCallback(() => {
    dispatch( setCommonPageShowEditDrawer( true ));
  }, []);

  const handleDrawerClose = useCallback(() => {
    dispatch( setCommonPageShowEditDrawer( false ));
    dispatch( setCommonEditedRecord( null ));
  }, []);

  const handleEditorSave = useCallback( async( data: any ) => {
    try {
      const parentRecordId = data.parent;

      if (!isNil(parentRecordId)) {
        delete data.parent;
      }

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

      if (!isNil(parentRecordId)) {
        console.log(result);
        const setParentDto = {
          recordId: result.data.id,
          parentRecordId
        };
        console.log( 'setParentDto', setParentDto );
        await setRecordParent(setParentDto);
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
          >{t('buttons.add')} {pageData.entities[ 0 ].name.toLowerCase()}
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
        <Stack
          gap="md"
          mt="lg"
          style={{
            flexGrow: 1,
          }}
        >
          <RecordsListFilters entityId={entity.id} />
          <ScrollArea h={`${window.innerHeight - 340}px`}>
            <RecordsListTable records={filteredData} entity={entity} />
            {/* <CommonDebugger field="BaseTablelistRenderer::filteredData" data={filteredData} /> */}
          </ScrollArea>
        </Stack>
      )}

      <Drawer
        opened={showDrawer}
        onClose={handleDrawerClose}
        title={`${isNil( selectedRecord ) ? t('buttons.add') : t('buttons.edit')} ${pageData.entities[ 0 ].name.toLowerCase()}`}
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
      {/* <CommonDebugger field="BaseTablelistRenderer::entityDetails" data={entityDetails} floating /> */}
      {/* <CommonDebugger field="BaseTablelistRenderer::entity" data={entity} floating /> */}

    </Stack>
  );
};
