import { Card, Group, Stack, Text } from '@mantine/core';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { IAttribute, IEntity } from '@uiDomain/domain.types';
import { TEntityAttribute } from '@uiDomain/types';
import { isEmpty } from 'lodash';
import { FC, useMemo } from 'react';

type TRecordDataTabProps = {
  record: Record<string, any>;
  entity: IEntity;
};

export const RecordDataTab: FC<TRecordDataTabProps> = ({ record, entity }) => {
  const attrsToDisplay = useMemo(() => {
    if ( !entity || !entity.attributes ) {
      return [];
    }

    return entity.attributes.filter(( attr: any ) => (
      attr.relation &&
        !attr.isMain &&
        !isEmpty( record.data[ attr.slug ])
    )
    );
  }, [ entity, record.data ]);

  return (
    <Card mr="lg">
      <Stack gap="md">
        {attrsToDisplay.map(( attr: IAttribute ) => (
          <Group gap="md" key={`record_attr_${attr.id}`}>
            <Text fw="bold">{attr.name}:</Text>
            <Text>{record.data[ attr.slug ]}</Text>
          </Group>
        ))}
        <Group gap="md">
          <Text fw="bold">Created by:</Text>
          <Text>{record.createdBy}</Text>
        </Group>
        <Group gap="md">
          <Text fw="bold">Created at:</Text>
          <Text>{record.createdAt}</Text>
        </Group>
      </Stack>
    </Card>
  );
};
