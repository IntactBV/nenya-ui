'use client';

import { FC, useMemo } from 'react';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { isEmpty, isNil } from 'lodash';
import { RecordEditorForm } from './RecordEditorForm';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';

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
  const parent = useMemo(() => {
    if ( !data ) {
      return null;
    }

    const parents = data.references.filter(( ref: any ) => !ref.relation );

    return isEmpty(parents)
      ? null
      : parents[ 0 ];
  }, [data]);
  // const editorEntities = useMemo(()=> {
  //   if ( !data ) {
  //     return [];
  //   }
  //   let list = entity.children || [];

  //   if ( !isEmpty( data.references )) {
  //     console.log( data.references );
  //     const refs = data.references.map( ( ref: any ) => ref.entity);
  //     list = [
  //       ...list,
  //       ...refs
  //     ];
  //   }

  //   console.log( 'editorEntities', list, data, isEmpty( data.references ));

  //   return list;
  // }, [data, entity])

  if ( !entity || isLoading ) {
    return <CommonPageLoader />;
  }

  return (
    <div>
      {/* <CommonDebugger data={data} field='data' /> */}

      {!isNil( data.attributes ) && (
        <RecordEditorForm
          attributes={data.attributes}
          entities={entity.children}
          moduleId={moduleId}
          onFormSubmit={onEditorSave}
          record={record}
          parent={parent}
        />
      )}

      {/* <pre>
        record: {JSON.stringify( record, null, 2 )}
        entity: {JSON.stringify( entity, null, 2 )}
      </pre> */}
    </div>
  );
};
