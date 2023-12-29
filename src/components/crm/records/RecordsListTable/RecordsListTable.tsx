import { Table } from '@mantine/core';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { useAppDispatch } from '@uiStore/hooks';
import { FC, useMemo } from 'react';
import * as fieldRenderers from '@crmComponents/renderers/fields';
import { capitalize } from 'lodash';
import { TFieldRendererProps } from '@crmComponents/renderers/fields/field-renderers.types';
import css from './RecordsListTable.module.css';

type TRecordsListTableProps = {
  entity: { id: string, children: any[] };
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
    const headerItems = ( entityDetails?.attributes
      .filter(( attr: { isMain: boolean }) => attr.isMain )) || [];

    for ( const e of entity.children ) {
      headerItems.push({
        slug: e.slug,
        name: e.name,
      });
    }

    headerItems.push({
      slug: '_actions',
      name: 'Actions',
      align: 'right',
    });

    return (
      <Table.Thead>
        <Table.Tr>
          {
            headerItems
              .map(( attr: any ) => (
                <Table.Th key={`header_${attr.slug}`} style={{ textAlign: attr.align || 'left' }}>{attr.name}</Table.Th>
              ))
          }
        </Table.Tr>
      </Table.Thead>
    );
  }, [ entityDetails?.attributes ]);

  const renderBody = useMemo(() => {
    const rows = records
      .map(( rawRecord: any ) => {
        const record = { ...rawRecord };
        const columns = ( entityDetails?.attributes
          .filter(( attr: { isMain: boolean }) => attr.isMain )) || [];
        const subEntitiesSlugs: string[] = [];

        for ( const e of entity.children ) {
          subEntitiesSlugs.push( e.slug );
          columns.push({
            slug: e.slug,
          });
        }

        columns.push({
          slug: '_actions',
        });

        return (
          <Table.Tr key={`row_${rawRecord.id}`} className={css.recordRow}>{
            columns
              .map(( attr: any ) => {
                const rendererName = subEntitiesSlugs.includes( attr.slug )
                  ? 'EntityFieldRenderer'
                  : attr.slug === '_actions'
                    ? 'ActionsFieldRenderer'
                    : `${capitalize( attr.slug )}FieldRenderer`;
                const FieldRenderer = (( fieldRenderers as Record<string, any> )[ rendererName ] as
              FC<TFieldRendererProps> )
                || fieldRenderers.TextFieldRenderer;
                return (
                  <Table.Td
                    key={`row_${record.id}_col_${attr.slug}`}
                  >
                    <FieldRenderer field={attr.slug === '_actions' ? record : record[ attr.slug ]} />
                  </Table.Td>
                );
              })
          }
          </Table.Tr> );
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
