'use client';

import { Badge, Group, Stack, Tabs, Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { $isDarkMode } from '@uiDomain/signals/common.signals';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { isEmpty } from 'lodash';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import css from './RecordDetailsTabs.module.css';
import { SubEntityTab } from './SubEntityTab';

type TRecordListFiltersProps = {
  entityId: string;
  record: any;
};

export const RecordDetailsTabs: FC<TRecordListFiltersProps> = ({
  entityId,
  record,
}) => {
  const [ activeTab, setActiveTab ] = useState<string | null>( null );
  const {
    data: entity,
    isLoading: entityLoading,
    isSuccess,
  } = useGetEntityDetailsQuery( entityId );

  useEffect(() => {
    if ( !isSuccess || !entity || !entity.entities || isEmpty( entity.entities )) {
      setActiveTab( 'others' );
      return;
    }

    setTimeout(() => {
      setActiveTab( entity.entities[ 0 ].slug );
    }, 100 );
  }, [ isSuccess, entity ]);

  if ( entityLoading ) {
    return <CommonPageLoader />;
  }

  return (
    <div className={css.wrapper}>
      <Tabs
        color="violet"
        variant="outline"
        value={activeTab}
        onChange={setActiveTab}
        pl="lg"
        radius="sm"
      >
        <Tabs.List
          className={`${css.tabList} ${css[ $isDarkMode.value ? 'dark' : 'light' ]}`}
          mb="lg"
        >
          {entity.entities.map(( subEntity: any ) => (
            <Tabs.Tab key={`tab_${subEntity.id}`} value={subEntity.slug}>{subEntity.name}</Tabs.Tab>
          ))}
          <Tabs.Tab value="others">Others</Tabs.Tab>
        </Tabs.List>

        {entity.entities.map(( subEntity: any ) => (
          <Tabs.Panel key={`panel_${subEntity.id}`} value={subEntity.slug} pr="lg">
            <SubEntityTab
              entity={{
                ...subEntity,
                parent: {
                  id: record.id,
                  slug: entity.slug,
                },
              }}
            />
          </Tabs.Panel>
        ))}

        <Tabs.Panel value="others">
          <Stack gap="md">
            <Group gap="md">
              <Text>Created by:</Text>
              <strong>{record.createdBy}</strong>
            </Group>
            <Group gap="md">
              <Text>Created at:</Text>
              <strong>{record.createdAt}</strong>
            </Group>
          </Stack>

          {/* <CommonDebugger field="record" data={record} /> */}
          {/* <CommonDebugger field="entity" data={entity} /> */}

        </Tabs.Panel>

      </Tabs>
    </div>
  );
};
