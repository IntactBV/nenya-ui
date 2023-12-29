'use client';

import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetRecordsByModuleQuery } from '@uiRepos/records.repo';
import { isEmpty } from 'lodash';
import { NoData } from '@uiComponents/common/NoData';
import { useGetModuleStructureQuery } from '@uiRepos/modules.repo';
import { modals } from '@mantine/modals';
import { TenantEntityModal } from '../entities/TenantEntityModal';

export const TenantModuleScreen: FC = () => {
  const { t } = useTranslation();
  const { data: moduleStructure, isLoading: structLoading, error: structError } = useGetModuleStructureQuery( 'contacts' );
  const { data: moduleData, isLoading, error, isError, isSuccess, status } = useGetRecordsByModuleQuery( 'contacts' );
  const handleAddButtonClick = useCallback(( editMode = false ) => {
    modals.open({
      id: 'addTenantModal',
      title: `Add ${t( `${'contact'}.singular` ).toLowerCase()}`,
      children: (
        <TenantEntityModal
          entity={moduleStructure[ 0 ].entities[ 0 ]}
          // onClose={() => {
          //   modals.closeAll();
          // }}
        />
      ),
    });
  }, []);

  if ( isLoading || structLoading ) {
    return ( <CommonPageLoader message="Loading ... " /> );
  }

  if ( isEmpty( moduleData )) {
    return (
      <NoData
        buttonLabel="Add the first record"
        description="No data found"
        buttonClickHandler={() => {
          handleAddButtonClick();
        }}
      />
    );
  }

  return (
    <div>
      <CommonDebugger data={moduleStructure} field="moduleStructure" />
      <CommonDebugger data={moduleData} field="moduleData" />
    </div>
  );
};
