'use client';

import { Badge, Group, Indicator, Stack, Tabs, Text } from '@mantine/core';
import { FC, useEffect, useMemo, useState } from 'react';
import { $isDarkMode } from '@uiDomain/signals/common.signals';
import { useGetEntityDetailsQuery, useGetEntityRelationsQuery } from '@uiRepos/entities.repo';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { isEmpty } from 'lodash';
import css from './RecordDetailsTabs.module.css';
import { SubEntityTab } from './SubEntityTab';
import { RecordDataTab } from '../tabs/RecordDataTab';
import { RecordChildTab } from '../tabs/RecordChildTab';
import { useTranslation } from 'react-i18next';
import { RecordRelationsTab } from '../RecordRelationsTab/RecordRelationsTab';

type TRecordListFiltersProps = {
  entityId: string;
  record: any;
};

export const RecordDetailsTabs: FC<TRecordListFiltersProps> = ({
  entityId,
  record,
}) => {
  const { t } = useTranslation();
  const [ activeTab, setActiveTab ] = useState<string | null>( null );
  const {
    data: entity,
    isLoading: entityLoading,
    isSuccess,
  } = useGetEntityDetailsQuery( entityId );
  const {
    data: entityRelations,
    isLoading: usedEntityLoading,
  } = useGetEntityRelationsQuery( entityId );

  const attrsWithTabs = useMemo(() => {
    if ( !entity || !entity.attributes ) {
      return [];
    }

    return entity.attributes.filter(( attr: any ) => ( !attr.relation ));
  }, [ entity ]);

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
        variant="default"
        value={activeTab}
        onChange={setActiveTab}
        pl="lg"
        radius="sm"
      >
        <Tabs.List
          className={`${css.tabList} ${css[ $isDarkMode.value ? 'dark' : 'light' ]}`}
          mb="lg"
        >
          {/* {entity.entities.map(( subEntity: any ) => (
            <Tabs.Tab key={`tab_${subEntity.id}`} value={subEntity.slug}>{subEntity.name}</Tabs.Tab>
          ))} */}
          <Tabs.Tab value="others">Details</Tabs.Tab>

          {attrsWithTabs.map(( attr: any ) => (
            <Tabs.Tab key={`tab_${attr.id}`} value={attr.slug}>
              <Group>
                {/* <Badge>{record.data[ attr.slug ].split( ',' ).length}</Badge> */}
                <Indicator
                  inline
                  position="top-end"
                  size={20}
                  withBorder
                  pr="xs"
                  label={record.data[ attr.slug ]?.length || 0}
                >
                  <Text>{attr.name}</Text>
                </Indicator>
              </Group>
            </Tabs.Tab>
          ))}

          {/* {entityRelations?.map(( rel: any ) => (
            <Tabs.Tab key={`tab_rel_${rel.id}`} value={rel.slug}>
              {t(`entities.plurals.${rel.slug}`)}
            </Tabs.Tab>
          ))} */}

        </Tabs.List>

        {/* {entity.entities.map(( subEntity: any ) => (
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
        ))} */}

        <Tabs.Panel value="others">
          <RecordDataTab record={record} entity={entity} />
        </Tabs.Panel>

        {attrsWithTabs.map(( attr: any ) => (
          <Tabs.Panel key={`tab_panel_${attr.id}`} value={attr.slug}>
            <RecordChildTab
              attribute={attr}
              record={record}
            />
          </Tabs.Panel>
        ))}

          {/* {entityRelations?.map(( relEntity: any ) => (
            <Tabs.Panel key={`tab_rel_panel_${relEntity.id}`} value={relEntity.slug}>
              <RecordRelationsTab
                record={record.data}
                entity={relEntity}
              />
            </Tabs.Panel>
          ))}
 */}

      </Tabs>
    </div>
  );
};
