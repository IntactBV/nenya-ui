import { CommonPageLoader } from "@uiComponents/common/CommonPageLoader";
import { useGetRecordRelationsQuery } from "@uiRepos/records.repo";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RecordsListTable } from "../RecordsListTable/RecordsListTable";
import { IEntity } from "@uiDomain/domain.types";
import { ScrollArea, Stack } from "@mantine/core";
import { RecordsListFilters } from "../RecordsListFilters/RecordsListFilters";
import { isEmpty } from "lodash";
import { selectCommnFilters } from "@uiStore/features/common/common.selectors";
import { useAppSelector } from "@uiStore/hooks";
import { useGetEntityDetailsQuery } from "@uiRepos/entities.repo";
import { EEntityFieldType } from "@uiDomain/types";

type TRecordRelationsTabProps = {
  record: any;
  entity: IEntity; 
};

export const RecordRelationsTab: FC<TRecordRelationsTabProps> = ({
  record,
  entity
}) => {
  const { t } = useTranslation();
  const commonFilters = useAppSelector( selectCommnFilters );
  const { 
    data: recordsData, 
    isLoading 
  } = useGetRecordRelationsQuery( {
    recordId: record.id, 
    entityId: entity.id
  });
  const {
    data: entityDetails,
    isLoading: attributesLoading,
    isError: attributesHasError,
    error: attributesError,
  } = useGetEntityDetailsQuery( entity.id );  
  const filteredData = useMemo(() => {
    if ( !recordsData ) {
      return [];
    }

    return recordsData.filter(( record: any ) => {
      let found = true;

      if ( !entityDetails?.attributes ) {
        return true;
      }

      for ( const attr of entityDetails.attributes ) {
        let queryFound = false;

        if ( isEmpty( commonFilters.query )) {
          queryFound = true;
        } else if ( !isEmpty( commonFilters.query )
          && !isEmpty( record[ attr.slug ])
          && record[ attr.slug ]?.toLowerCase().includes( commonFilters.query.toLowerCase())
        ) {
          queryFound = true;
        }

        if ( !queryFound ) {
          found = false;
          continue;
        }

        const entityKeys: string[] = [];

        for ( const entityAttr of entityDetails.attributes ) {
          if ( entityAttr.fieldType === EEntityFieldType.Entity ) {
            entityKeys.push( entityAttr.slug );
          }
        }

        if ( isEmpty( entityKeys )) {
          return queryFound;
        }

        let entityFound = true;

        for ( const key of entityKeys ) {
          if ( isEmpty( commonFilters[ key ])) {
            continue;
          }

          if ( record[ key ] !== commonFilters[ key ]) {
            entityFound = false;
          }
        }

        if ( queryFound && entityFound ) {
          return true;
        }

        found = false;
      }

      return found;
    });
  }, [ recordsData, commonFilters, entityDetails ]);

  if (isLoading) {
  return (
    <CommonPageLoader />
  )
  }

  return (
    <Stack
      gap="md"
      mt="lg"
      style={{
        flexGrow: 1,
      }}
    >
      <RecordsListFilters entityId={entity.id} />
      <ScrollArea h={`${window.innerHeight - 465}px`}>
        <RecordsListTable 
          entity={{
            id: entity.id,
            children: []
          }} 
          records={filteredData} 
        />
      </ScrollArea>
    </Stack>
  )
}