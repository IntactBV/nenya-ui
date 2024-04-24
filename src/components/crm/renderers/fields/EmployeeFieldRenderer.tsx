import { FC, useMemo } from 'react';
import { Avatar, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { useGetRecordDetailsQuery } from '@uiRepos/records.repo';
import { TFieldRendererProps } from './field-renderers.types';
import { AvatarFieldRenderer } from './AvatarFieldRenderer';

export const EmployeeFieldRenderer: FC<TFieldRendererProps> = ({ field, record }) => {
  const {
    data: entityRecord,
    isLoading: recordLoading,
    isError: recordErrored,
  } = useGetRecordDetailsQuery( field );

  const initials = useMemo(() => {
    if ( !entityRecord ) {
      return '-';
    }

    const [ first, last ] = entityRecord.data?.name?.split( ' ' ) || [ '', '' ];

    return `${first[ 0 ]}${last?.[ 0 ] || ''}`;
  }, [ entityRecord ]);

  if ( recordLoading || recordErrored ) {
    return <span>&nbsp;</span>;
  }

  return (
    <Tooltip label={entityRecord?.data?.name || entityRecord?.data?.[ 'full-name' ] || ''} position="top-start" withArrow>
      <Link href={`/crm/records/${entityRecord?.id}`}>
        <AvatarFieldRenderer field={field} record={entityRecord?.data} />
      </Link>
    </Tooltip>
  );
};
