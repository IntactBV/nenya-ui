'use client';

import { FC, useCallback } from 'react';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { isNil } from 'lodash';
import { RecordEditorForm } from './RecordEditorForm';

type TRecordEditorProps = {
  entity: { id: string };
  onEditorSave: ( formData: any ) => void
};

export const RecordEditor: FC<TRecordEditorProps> = ({
  entity,
  onEditorSave,
}) => {
  const { data, isLoading, isError, error } = useGetEntityDetailsQuery( entity.id );

  if ( !entity || isLoading ) {
    return <CommonPageLoader />;
  }

  return (
    <div>
      {!isNil( data.attributes ) && (
        <RecordEditorForm
          attributes={data.attributes}
          onFormSubmit={onEditorSave}
        />
      )}
      {/* <pre>
        {JSON.stringify( data, null, 2 )}
      </pre> */}
    </div>
  );
};
