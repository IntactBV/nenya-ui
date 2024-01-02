import { ActionIcon, Card, Group, Input, InputLabel, Stack, Text } from '@mantine/core';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { selectCommnFilters } from '@uiStore/features/common/common.selectors';
import { setCommonFilter } from '@uiStore/features/common/common.slice';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { FC, useCallback, useMemo } from 'react';
import { GoFilter, GoSearch, GoX } from 'react-icons/go';
import { RecordEditorEntitySelector } from '../RecordEditor/RecordEditorEntitySelector';

type TRecordListFiltersProps = {
  entityId: string;
  moduleId: string;
};

export const RecordsListFilters: FC<TRecordListFiltersProps> = ({
  entityId,
  moduleId,
}) => {
  const dispatch = useAppDispatch();
  const commonFilters = useAppSelector( selectCommnFilters );
  const {
    data: entityDetails,
    isLoading: attributesLoading,
    isError: attributesHasError,
    error: attributesError,
  } = useGetEntityDetailsQuery( entityId );

  const handleFilterChange = useCallback(( e: any ) => {
    dispatch( setCommonFilter({
      query: e.target.value,
    }));
  }, []);
  const handleClearQueryClick = useCallback(() => {
    dispatch( setCommonFilter({
      query: '',
    }));
  }, []);
  const handleEntityFilterChange = useCallback(( entity: any ) => ( e: any ) => {
    dispatch( setCommonFilter({
      [ entity.slug ]: e,
    }));
  }, []);
  const showClearFiltersButton = useMemo(() => !!( commonFilters.query ), [ commonFilters ]);
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
          />
        </Stack>

        {entityDetails?.parent && (
          <RecordEditorEntitySelector
            entity={entityDetails?.parent}
            moduleId={moduleId}
            showLabel
            props={{
              value: commonFilters[ entityDetails?.parent.slug ] || '',
              onChange: handleEntityFilterChange( entityDetails?.parent ),
            }}
            withAllOption
          />
        )}

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
