'use client';

import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { FC, PropsWithChildren, useMemo } from 'react';
import { $isDarkMode } from '@uiDomain/signals/common.signals';
import { isNil } from 'lodash';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import css from './RecordDetailsHeader.module.css';

type TRecordDetailsHeaderProps = PropsWithChildren & {
  record: any;
};
export const RecordDetailsHeader: FC<TRecordDetailsHeaderProps> = ({
  record,
  children,
}) => {
  const {
    data: entity,
    isLoading: entityLoading,
  } = useGetEntityDetailsQuery( record?.entityId );

  const title: string = useMemo(() => {
    if ( isNil( record ) || isNil( entity )) {
      return '';
    }
    const mainAttribute = entity.attributes.find(( attr: any ) => attr.isMain );

    return record.data[ mainAttribute.slug ];
  }, [ record, entity ]);

  if ( entityLoading ) {
    return <CommonPageLoader />;
  }

  return (
    <Stack id="RecordDetailsPageHeader" className={`${css.header} ${css[ $isDarkMode.value ? 'dark' : 'light' ]}`}>
      <Group justify="space-between">

        <Stack gap="xs">
          <Title order={1} className={css.title}>{title}</Title>
          <Text>{entity.name}</Text>
          {!isNil( entity.parent ) && (
            <Group>
              <Text size="sm">{entity.parent.name}:</Text>
              <Button variant="subtle" size="compact-sm">{record.data[ entity.parent.slug ].name}</Button>
            </Group>
          )}
        </Stack>

        <Stack>
          {children}
        </Stack>
      </Group>
    </Stack>
  );
};
