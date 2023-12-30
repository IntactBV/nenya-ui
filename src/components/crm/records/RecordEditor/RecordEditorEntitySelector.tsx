import { FC } from 'react';
import { Select } from '@mantine/core';
import { useGetPageRecordsQuery, useGetRecordsByModuleQuery } from '@uiRepos/records.repo';
import { sortBy } from 'lodash';

type IRecordEditorEntitySelectorProps = {
  entity: any;
  moduleId: string;
  props?: any;
  showLabel?: boolean;
};

export const RecordEditorEntitySelector: FC<IRecordEditorEntitySelectorProps> = ({
  entity,
  moduleId,
  props,
  showLabel = true,
}) => {
  const { data: entityRecords, isLoading } = useGetPageRecordsQuery({
    entityId: entity.id,
    moduleId,
  });

  if ( isLoading ) {
    return <div>Loading ...</div>;
  }

  return (
    <Select
      searchable
      variant="filled"
      label={showLabel ? `Select ${entity.name.toLowerCase()}` : null}
      placeholder={`Select ${entity.name.toLowerCase()}`}
      data={sortBy( entityRecords, 'name' ).map(( record: any ) => (
        { value: record.id, label: record.name }
      ))}
      {...props}
    />
  );
};
