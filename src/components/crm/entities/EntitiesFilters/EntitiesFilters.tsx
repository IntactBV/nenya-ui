import { Card, Group, Input, MultiSelect } from '@mantine/core';
import { useSignals } from '@preact/signals-react/runtime';
import { $entitiesFilterName, $entitiesFilterTags } from '@uiSignals/entities.signals';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CiFilter } from 'react-icons/ci';

type TEntitiesFiltersProps = {
  entities: any[];
};

export const EntitiesFilters: FC<TEntitiesFiltersProps> = ({
  entities,
}) => {
  const { t } = useTranslation();
  const tags = useMemo(() => {
    const uniqTags = entities.reduce(( acc, attribute ) => {
      for ( const tag of attribute.tags ) {
        if ( !acc.includes( tag )) {
          acc.push( tag );
        }
      }
      return acc;
    }, []);
    return uniqTags.map(( tag ) => ({ value: tag, label: tag }));
  }, [ entities ]);

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
          placeholder={t( 'app.settings.admin.entities.name' )}
          value={$entitiesFilterName.value}
          onChange={( e ) => {
            $entitiesFilterName.value = e.currentTarget.value;
          }}
        />
        <MultiSelect
          data={tags}
          placeholder="Pick tags"
          withAsterisk
          value={$entitiesFilterTags.value}
          onChange={( tags ) => {
            $entitiesFilterTags.value = tags;
          }}
        />

      </Group>
    </Card>
  );
};
