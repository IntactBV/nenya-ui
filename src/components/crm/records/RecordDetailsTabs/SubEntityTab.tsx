import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { useFilterRecordsMutation } from '@uiRepos/records.repo';
import { isNil } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { RecordsListTable } from '../RecordsListTable/RecordsListTable';

type TSubEntityTabProps = {
  entity: any;
};

export const SubEntityTab: FC<TSubEntityTabProps> = ({
  entity,
}) => {
  const a = 1;

  const [ fetchSubRecords, fetchStatus ] = useFilterRecordsMutation();
  const [ subRecords, setSubRecords ] = useState<any[]>([]);

  useEffect(() => {
    if ( !entity || !fetchStatus.isUninitialized ) {
      return;
    }

    console.log( 'fetchStatus', fetchStatus );

    const fetchRecords = async() => {
      const filters: Record<string, any> = {
        entityId: entity.id,
        data: {},
      };
      if ( !isNil( entity.parent )) {
        filters.data[ entity.parent.slug ] = entity.parent.id;
      }
      console.log( '%%% SUB filters', filters );
      const records = await fetchSubRecords( filters );
      setSubRecords( records.data );
      console.log( '%%% SUB', records );
    };

    fetchRecords();
  }, [ entity ]);

  if ( fetchStatus.isLoading ) {
    return <CommonPageLoader />;
  }

  return (
    <div>
      <RecordsListTable entity={entity} records={subRecords} />
    </div>
  );
};
