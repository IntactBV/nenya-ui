import { Table } from '@mantine/core';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { useAppDispatch } from '@uiStore/hooks';
import { FC, useMemo } from 'react';
import * as fieldRenderers from '@crmComponents/renderers/fields';
import { capitalize } from 'lodash';
import { TFieldRendererProps } from '@crmComponents/renderers/fields/field-renderers.types';

type TRecordsListTableProps = {
  entity: { id: string };
  records: any[]
};

export const RecordsListTable: FC<TRecordsListTableProps> = ({
  entity,
  records,
}) => {
  const dispatch = useAppDispatch();
  const {
    data: entityDetails,
    isLoading: attributesLoading,
    isError,
    error: attributesError,
  } = useGetEntityDetailsQuery( entity.id );

  const renderHeader = useMemo(() => {
    const headerItems = entityDetails?.attributes
      .filter(( attr: { isMain: boolean }) => attr.isMain )
      .map(( attr: any ) => (
        <Table.Th key={`header_${attr.slug}`}>{attr.name}</Table.Th>
      ));

    return (
      <Table.Thead>
        <Table.Tr>
          {headerItems}
        </Table.Tr>
      </Table.Thead>
    );
  }, [ entityDetails?.attributes ]);

  const renderBody = useMemo(() => {
    const rows = records
      .map(( record: any ) => {
        const columns = entityDetails?.attributes
          .filter(( attr: { isMain: boolean }) => attr.isMain )
          .map(( attr: any ) => {
            const rendererName = `${capitalize( attr.slug )}FieldRenderer`;
            const FieldRenderer = (( fieldRenderers as Record<string, any> )[ rendererName ] as
          FC<TFieldRendererProps> )
            || fieldRenderers.TextFieldRenderer;
            return (
              <Table.Td
                key={`row_${record.id}_col_${attr.slug}`}
              >
                <FieldRenderer field={record[ attr.slug ]} />
              </Table.Td>
            );
          });
        return ( <Table.Tr>{columns}</Table.Tr> );
      });
    return (
      <Table.Tbody>{rows}</Table.Tbody>
    );
  }, [ records, entityDetails?.attributes ]);

  if ( attributesLoading ) {
    return (
      <CommonPageLoader />
    );
  }

  return (
    <Table>
      {renderHeader}
      {renderBody}
      {/* <pre>{JSON.stringify( entityDetails, null, 2 )}</pre> */}
    </Table>
  );
};
