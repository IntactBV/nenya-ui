import { Button, Table } from '@mantine/core';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { useAppDispatch } from '@uiStore/hooks';
import { FC, useMemo } from 'react';
import * as fieldRenderers from '@crmComponents/renderers/fields';
import { capitalize, isEmpty, isNil } from 'lodash';
import { TFieldRendererProps } from '@crmComponents/renderers/fields/field-renderers.types';
import Link from 'next/link';
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

    if ( !isNil( entityDetails?.parent )) {
      headerItems.push({
        slug: entityDetails?.parent.slug,
        name: entityDetails?.parent.name,
      });
    }

    if ( !isEmpty( entityDetails?.entities )) {
      for ( const ent of entityDetails.entities ) {
        headerItems.push({
          slug: ent.slug,
          name: ent.name,
        });
      }
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

        if ( !isNil( entityDetails?.parent )) {
          columns.push({
            slug: entityDetails?.parent.slug,
          });
        }

        if ( !isEmpty( entityDetails?.entities )) {
          for ( const ent of entityDetails.entities ) {
            columns.push({
              slug: ent.slug,
            });
          }
        }

        columns.push({
          slug: '_actions',
        });

        console.log( 'columns', columns );

        return (
          <Table.Tr key={`row_${rawRecord.id}`} className={css.recordRow}>{
            columns
              .map(( attr: any ) => {
                const rendererName = (
                  attr.slug === entityDetails?.parent?.slug ||
                  entityDetails?.entities.map(( ent: any ) => ent.slug ).includes( attr.slug )
                )
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
                    {attr.isMain && (
                      <Link href={`/crm/records/${record.id}`} className={css.mainAttr}>
                        <Button variant="subtle">
                          <FieldRenderer field={attr.slug === '_actions' ? record : record[ attr.slug ]} />
                        </Button>
                      </Link>
                    )}
                    {!attr.isMain && (
                      <FieldRenderer field={attr.slug === '_actions' ? record : record[ attr.slug ]} />
                    )}

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
    </Table>
  );
};
