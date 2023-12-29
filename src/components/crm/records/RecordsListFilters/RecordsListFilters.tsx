import { ActionIcon, Card, Group, Input, Text } from '@mantine/core';
import { selectCommnFilters } from '@uiStore/features/common/common.selectors';
import { setCommonFilter } from '@uiStore/features/common/common.slice';
import { useAppDispatch, useAppSelector } from '@uiStore/hooks';
import { FC, useCallback, useMemo } from 'react';
import { GoFilter, GoSearch, GoX } from 'react-icons/go';

export const RecordsListFilters: FC = () => {
  const dispatch = useAppDispatch();
  const commonFilters = useAppSelector( selectCommnFilters );
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
  const showClearFiltersButton = useMemo(() => !!( commonFilters.query ), [ commonFilters ]);
  return (
    <Card>
      <Group>
        <GoFilter size={20} />
        <Text>Filters</Text>
        <Input
          placeholder="Search"
          variant="filled"
          value={commonFilters.query}
          leftSection={<GoSearch size={20} />}
          onChange={handleFilterChange}
        />
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
