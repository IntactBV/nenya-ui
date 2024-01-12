import { Select, TextInput } from '@mantine/core';
import { FC, useMemo } from 'react';
import { useGetRecordsQuery } from '@uiRepos/records.repo';
import { sortBy } from 'lodash';
import { TFormRendererProps } from './form.types';

export const EntityRenderer: FC<TFormRendererProps> = ({ attribute, props, form }) => {
  const { data: entityRecords, isLoading } = useGetRecordsQuery({
    entityId: attribute.id,
  });
  const options = useMemo(() => {
    const list: any[] = sortBy( entityRecords, 'name' );

    return list.map(( record: any ) => (
      { value: record.id, label: record.name || '' }
    ));
  }, [ entityRecords ]);

  if ( isLoading ) {
    return <div>Loading ...</div>;
  }

  return (
    <Select
      searchable
      label={`Select ${attribute.name.toLowerCase()}`}
      placeholder={`Select ${attribute.name.toLowerCase()}`}
      data={options}
      {...props}
    />
    // <pre>{JSON.stringify( options, null, 2 )}</pre>
  );
};
