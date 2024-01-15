import { FC, useMemo } from 'react';
import Link from 'next/link';
import { useGetRecordDetailsQuery, useGetRecordsQuery } from '@uiRepos/records.repo';
import { Button } from '@mantine/core';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { IAttribute } from '@uiDomain/domain.types';
import css from './fields.module.css';

type TFieldRendererProps = {
  id: string;
  name: string;
};

type TEntityFieldRendererProps = {
  field: TFieldRendererProps;
};

export const EntityFieldRenderer: FC<TEntityFieldRendererProps> = ({
  field,
}) => {
  const {
    data: entityRecord,
    isLoading: recordLoading,
    isError: recordErrored,
  } = useGetRecordDetailsQuery( field );

  const { data: entityDetails } = useGetEntityDetailsQuery( entityRecord?.entityId );
  const mainSlug = useMemo(() => {
    const mainAttribute: IAttribute = entityDetails?.attributes?.find(
      ( attr: any ) => attr.isMain
    );

    return mainAttribute?.slug || 'name';
  }, [ entityDetails ]);

  if ( recordLoading || recordErrored ) {
    return <span>&nbsp;</span>;
  }

  return (
    <Link href={`/crm/records/${entityRecord?.id}`}>
      <Button
        variant="subtle"
        size="sm"
      >
        {entityRecord?.data[ mainSlug ]}
      </Button>
    </Link>
  );
};
