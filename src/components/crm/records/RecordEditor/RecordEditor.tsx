'use client';

import { FC } from 'react';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { isNil } from 'lodash';
import { RecordEditorForm } from './RecordEditorForm';

type TRecordEditorProps = {
  entity: { id: string, children: any[] };
  moduleId: string;
  record: Record<string, string> | null;
  onEditorSave: ( formData: any ) => void
};

export const RecordEditor: FC<TRecordEditorProps> = ({
  entity,
  moduleId,
  record,
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
          entities={entity.children}
          moduleId={moduleId}
          onFormSubmit={onEditorSave}
          record={record}
        />
      )}

      {/* <pre>
        record: {JSON.stringify( record, null, 2 )}
        entity: {JSON.stringify( entity, null, 2 )}
      </pre> */}
    </div>
  );
};
