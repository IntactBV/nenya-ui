import { ActionIcon, Card, Group, Input, InputLabel, Stack, Text } from '@mantine/core';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { selectCommnFilters } from '@uiStore/features/common/common.selectors';
import { setCommonFilter } from '@uiStore/features/common/common.slice';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { FC, useCallback, useMemo } from 'react';
import { GoFilter, GoSearch, GoX } from 'react-icons/go';
import { EEntityFieldType } from '@uiDomain/types';
import { isEmpty } from 'lodash';
import { RecordEditorEntitySelector } from '../RecordEditor/RecordEditorEntitySelector';

type TRecordListFiltersProps = {
  entityId: string;
};

export const RecordsListFilters: FC<TRecordListFiltersProps> = ({
  entityId,
}) => {
  const dispatch = useAppDispatch();
  const commonFilters = useAppSelector( selectCommnFilters );
  const {
    data: entityDetails,
    isLoading: attributesLoading,
  } = useGetEntityDetailsQuery( entityId );

  const handleFilterChange = useCallback(( e: any ) => {
    dispatch( setCommonFilter({
      query: e.target.value,
    }));
  }, []);
  const handleClearQueryClick = useCallback(() => {
    const newFilters = { ...commonFilters };

    if ( !isEmpty( newFilters.query )) {
      newFilters.query = '';
    }

    const entityAttributesSlugs = entityDetails?.attributes
      .filter(( attr: any ) => attr.fieldType === EEntityFieldType.Entity )
      .map(( attr: any ) => attr.slug );

    for ( const slug of entityAttributesSlugs ) {
      if ( !isEmpty( newFilters[ slug ])) {
        newFilters[ slug ] = null;
      }
    }

    dispatch( setCommonFilter( newFilters ));
  }, []);
  const handleEntityFilterChange = useCallback(( entity: any ) => ( optionId: any ) => {
    dispatch( setCommonFilter({
      [ entity.slug ]: optionId,
    }));
  }, []);
  const showClearFiltersButton = useMemo(() => {
    const entityAttributesSlugs = entityDetails?.attributes
      .filter(( attr: any ) => attr.fieldType === EEntityFieldType.Entity )
      .map(( attr: any ) => attr.slug );
    const hasFilters = entityAttributesSlugs?.some(( slug: string ) => !!commonFilters[ slug ]);

    return ( !!( commonFilters.query ) || hasFilters );
  }, [ commonFilters ]);

  if ( attributesLoading ) {
    return <div>Loading ...</div>;
  }

  return (
    <Card>
      <Group>
        <GoFilter size={20} />
        <Text>Filters</Text>
        <Stack gap={0}>
          <InputLabel>Search</InputLabel>
          <Input
            placeholder="Search"
            variant="filled"
            value={commonFilters.query}
            leftSection={<GoSearch size={20} />}
            onChange={handleFilterChange}
            w={150}
          />
        </Stack>

        {entityDetails?.attributes.filter(( item: any ) => item.showInList )
          .map(( entityAttr: any ) => {
            if ( entityAttr.fieldType !== EEntityFieldType.Entity ) {
              return null;
            }

            return (
              <RecordEditorEntitySelector
                key={`selector_${entityAttr.id}`}
                entity={{ id: entityAttr.id, name: entityAttr.name, slug: entityAttr.slug }}
                showLabel
                props={{
                  value: commonFilters[ entityAttr.slug ] || '',
                  w: '150',
                  onChange: handleEntityFilterChange( entityAttr ),
                }}
                withAllOption
              />
            );
          })}

        {showClearFiltersButton && (
          <ActionIcon
            variant="subtle"
            onClick={handleClearQueryClick}
            style={{
              cursor: 'pointer',
            }}>
            <GoX size={20} />
          </ActionIcon>
        )}

      </Group>
    </Card>
  );
};
