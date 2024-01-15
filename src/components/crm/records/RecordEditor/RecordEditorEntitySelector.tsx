import { FC, useMemo } from 'react';
import { Select } from '@mantine/core';
import { useGetPageRecordsQuery, useGetRecordsByModuleQuery, useGetRecordsQuery } from '@uiRepos/records.repo';
import { sortBy } from 'lodash';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';

type IRecordEditorEntitySelectorProps = {
  entity: any;
  // moduleId: string;
  props?: any;
  showLabel?: boolean;
  withAllOption?: boolean;
};

export const RecordEditorEntitySelector: FC<IRecordEditorEntitySelectorProps> = ({
  entity,
  // moduleId,
  props,
  showLabel = true,
  withAllOption = false,
}) => {
  const { data: entityRecords, isLoading } = useGetRecordsQuery({
    entityId: entity.id,
  });
  const { data: entityDetails } = useGetEntityDetailsQuery( entity.id );

  const mainSlug = useMemo(() => {
    const attribute = entityDetails?.attributes?.find(
      ( attr: any ) => attr.isMain
    );

    return attribute?.slug || 'name';
  }, [ entityDetails ]);

  const options = useMemo(() => {
    const list: any[] = sortBy( entityRecords, mainSlug );

    if ( withAllOption ) {
      list.unshift({
        id: '',
        [ mainSlug ]: 'All',
      });
    }

    return list.map(( record: any ) => (
      { value: record.id, label: record[ mainSlug ] || '' }
    ));
  }, [ entityRecords ]);

  if ( isLoading ) {
    return <div>Loading ...</div>;
  }

  if ( !entity || !entity.name ) {
    return null;
  }

  return (
    <Select
      searchable
      variant="filled"
      label={showLabel ? `Select ${entity.name?.toLowerCase()}` : null}
      placeholder={`Select ${entity.name?.toLowerCase()}`}
      data={options}
      {...props}
    />
  );
};
