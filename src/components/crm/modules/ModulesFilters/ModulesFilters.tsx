import { Card, Group, Input, MultiSelect } from '@mantine/core';
import { useSignals } from '@preact/signals-react/runtime';
import { $modulesFilterName, $modulesFilterTags } from '@uiSignals/modules.signals';
import { FC, useMemo } from 'react';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CiFilter } from 'react-icons/ci';

type TModulesFiltersProps = {
  modules: any[];
};

export const ModulesFilters: FC<TModulesFiltersProps> = ({
  modules,
}) => {
  const { t } = useTranslation();
  const filters = useMemo(() => {
    const uniqTags = modules.reduce(( acc, mod: any ) => {
      if (isNil(mod.tags)) return acc;
      for ( const tag of mod.tags ) {
        if ( !acc.includes( tag )) {
          acc.push( tag );
        }
      }
      return acc;
    }, []);
    return uniqTags.map(( tag: string ) => ({ value: tag, label: tag }));
  }, [ modules ]);

  // const types = useMemo(() => {
  //   const uniqTags = entities.reduce(( acc, attribute ) => {
  //     if ( !acc.includes( attribute.type )) {
  //       acc.push( attribute.type );
  //     }
  //     return acc;
  //   }, []);
  //   return uniqTags.map(( tag ) => ({ value: tag, label: tag }));
  // }, [ entities ]);

  useSignals();

  return (
    <Card shadow="md" mb="xl" withBorder>
      <Group>
        <CiFilter size={20} />
        <Input
          name="name"
          placeholder={t( 'app.settings.admin.modules.name' )}
          value={$modulesFilterName.value}
          onChange={( e ) => {
            $modulesFilterName.value = e.currentTarget.value;
          }}
        />
        <MultiSelect
          disabled={filters.length === 0}
          data={filters}
          placeholder="Pick tags"
          withAsterisk
          value={$modulesFilterTags.value}
          onChange={( tags ) => {
            $modulesFilterTags.value = tags;
          }}
        />
        {/* <MultiSelect
          data={types}
          placeholder="Pick types"
          withAsterisk
          value={$attrFilterTypes.value}
          onChange={( tags ) => {
            $attrFilterTypes.value = tags;
          }}
        /> */}
      </Group>
    </Card>
  );
};
