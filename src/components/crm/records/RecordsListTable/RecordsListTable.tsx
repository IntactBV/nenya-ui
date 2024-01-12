import { Button, Table } from '@mantine/core';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { useGetEntityDetailsQuery } from '@uiRepos/entities.repo';
import { useAppDispatch } from '@uiStore/hooks';
import { FC, useMemo } from 'react';
import * as fieldRenderers from '@crmComponents/renderers/fields';
import { capitalize, isEmpty, isNil } from 'lodash';
import { TFieldRendererProps } from '@crmComponents/renderers/fields/field-renderers.types';
import { AvatarFieldRenderer } from '@crmComponents/renderers/fields/AvatarFieldRenderer';
import Link from 'next/link';
import { EEntityFieldType } from '@uiDomain/types';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
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
  const attributes = useMemo(() => {
    if ( !entityDetails ) {
      return [];
    }
    return entityDetails.attributes.map(( attr: any ) => attr.slug );
  }, [ entityDetails ]);
  const columns = useMemo(() => {
    if ( !entityDetails ) {
      return [];
    }

    return entityDetails.attributes?.filter(( attr: any ) => attr.showInList ) || [];
  }, [ entityDetails ]);

  const renderHeader = useMemo(() => {
    const headerItems = [ ...columns ];

    // if ( !isNil( entityDetails?.parent )) {
    //   headerItems.push({
    //     slug: entityDetails?.parent.slug,
    //     name: entityDetails?.parent.name,
    //   });
    // }

    // if ( !isEmpty( entityDetails?.entities )) {
    //   for ( const ent of entityDetails.entities ) {
    //     headerItems.push({
    //       slug: ent.slug,
    //       name: ent.name,
    //     });
    //   }
    // }

    headerItems.push({
      slug: '_actions',
      name: 'Actions',
      align: 'right',
    });

    const slugsToHide = [ 'id', 'avatar', '_actions' ];

    return (
      <Table.Thead>
        <Table.Tr>
          {
            headerItems
              .filter(( attr: any ) => !slugsToHide.includes( attr.slug ))
              .map(( attr: any ) => (
                <Table.Th
                  key={`header_${attr.slug}`}
                  style={{ textAlign: attr.align || 'left' }}
                  w={attr.slug === 'avatar' ? 40 : 'auto'}
                >
                  {slugsToHide.includes( attr.slug ) ? '' : attr.name}
                </Table.Th>
              ))
          }
        </Table.Tr>
      </Table.Thead>
    );
  }, [ entityDetails?.attributes ]);

  const renderCell = ( attr: any, record ) => {
    const rendererName = (
      attr.fieldType === EEntityFieldType.Entity
    )
      ? isNil(( fieldRenderers as Record<string, any> )[ `${capitalize( attr.slug )}FieldRenderer` ])
        ? 'EntityFieldRenderer'
        : `${capitalize( attr.slug )}FieldRenderer`
      : attr.slug === '_actions'
        ? 'ActionsFieldRenderer'
        : `${capitalize( attr.slug )}FieldRenderer`;
    const FieldRenderer = (
      ( fieldRenderers as Record<string, any> )[ rendererName ] as FC<TFieldRendererProps>
    ) || fieldRenderers.TextFieldRenderer;

    // @TODO - field to mark columns to skip / show
    const slugsToSkip = [ 'id', 'avatar' ];

    if ( slugsToSkip.includes( attr.slug )) {
      return null;
    }

    if ( attr.isMain ) {
      return (
        <Table.Td
          id={`row_${record.id}_col_${attr.slug}`}
          key={`row_${record.id}_col_${attr.slug}`}
        >
          <Link href={`/crm/records/${record.id}`} className={css.mainAttr}>
            <Button
              size="md"
              variant="subtle"
              leftSection={attributes.includes( 'avatar' )
                ? <AvatarFieldRenderer field={{}} record={record} />
                : null
              }
            >
              <FieldRenderer field={attr.slug === '_actions' ? record : record[ attr.slug ]} />
            </Button>
          </Link>
        </Table.Td>
      );
    }

    return (
      <Table.Td
        id={`row_${record.id}_col_${attr.slug}`}
        key={`row_${record.id}_col_${attr.slug}`}
      >
        <FieldRenderer
          field={attr.slug === '_actions' ? record : record[ attr.slug ]}
          record={record}
        />
      </Table.Td>
    );
  };

  const renderBody = useMemo(() => {
    const rows = records
      .map(( rawRecord: any, recordIndex: number ) => {
        const record = { ...rawRecord };
        const tableColumns = [ ...columns ];

        // if ( !isNil( entityDetails?.parent )) {
        //   columns.push({
        //     slug: entityDetails?.parent.slug,
        //   });
        // }

        // if ( !isEmpty( entityDetails?.entities )) {
        //   for ( const ent of entityDetails.entities ) {
        //     columns.push({
        //       slug: ent.slug,
        //     });
        //   }
        // }

        tableColumns.push({
          slug: '_actions',
        });

        return (
          <Table.Tr key={`row_${rawRecord.id}_`} className={css.recordRow}>{
            tableColumns
              .map(( attr: any ) => renderCell( attr, record ))
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
