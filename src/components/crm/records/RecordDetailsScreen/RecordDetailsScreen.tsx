'use client';

import { Stack } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useGetRecordDetailsQuery } from '@uiRepos/records.repo';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { isNil } from 'lodash';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { RecordDetailsHeader } from '../RecordDetailsHeader/RecordDetailsHeader';
import { RecordDetailsTabs } from '../RecordDetailsTabs/RecordDetailsTabs';

export const RecordDetailsScreen = () => {
  const { recordId } = useParams();
  const { data: record, isLoading: recordLoading } = useGetRecordDetailsQuery( recordId );

  if ( recordLoading || isNil( record )) {
    return <CommonPageLoader />;
  }

  return (
    <Stack>
      <RecordDetailsHeader record={record} />
      <RecordDetailsTabs entityId={record?.entityId} record={record} />
      {/* <CommonDebugger field="record" data={record} /> */}
    </Stack>
  );
};
