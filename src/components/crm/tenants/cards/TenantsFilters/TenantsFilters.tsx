import { Card, Group, Input, MultiSelect } from '@mantine/core';
import { useSignals } from '@preact/signals-react/runtime';
import { $modulesFilterName } from '@uiSignals/modules.signals';
import { $tenantsFilterName } from '@uiSignals/tenants.signals';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CiFilter } from 'react-icons/ci';

type TTenantsFiltersProps = {
  tenants: any[];
};

export const TenantsFilters: FC<TTenantsFiltersProps> = ({
  tenants,
}) => {
  const { t } = useTranslation();
  // const filters = useMemo(() => {
  //   const uniqTags = entities.reduce(( acc, attribute ) => {
  //     for ( const tag of attribute.tags ) {
  //       if ( !acc.includes( tag )) {
  //         acc.push( tag );
  //       }
  //     }
  //     return acc;
  //   }, []);
  //   return uniqTags.map(( tag ) => ({ value: tag, label: tag }));
  // }, [ entities ]);
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
          placeholder={t( 'app.settings.admin.tenants.name' )}
          value={$tenantsFilterName.value}
          onChange={( e ) => {
            $tenantsFilterName.value = e.currentTarget.value;
          }}
        />
        {/* <MultiSelect
          data={filters}
          placeholder="Pick tags"
          withAsterisk
          value={$attrFilterTags.value}
          onChange={( tags ) => {
            $attrFilterTags.value = tags;
          }}
        />
        <MultiSelect
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
