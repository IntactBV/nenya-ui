import { ActionIcon, Group, ScrollAreaAutosize, Stack, Title, Tooltip } from "@mantine/core";
import { CommonDebugger } from "@uiComponents/common/CommonDebugger";
import { BookingWeekHorizontal } from "@uiComponents/modules/booking/BookingWeekHorizontal";
import { BookingWeekVertical } from "@uiComponents/modules/booking/BookingWeekVertical";
import { useGetPageRecordsQuery, useLazyGetRecordDetailsQuery } from "@uiRepos/records.repo";
import { FC, useEffect, useMemo, useState } from "react";
import { GoGear } from "react-icons/go";

type TBookingWeekListRendererProps = {
  pageData: any;
};

export const BookingWeekListRenderer: FC<TBookingWeekListRendererProps> = ({ pageData }) => {

  const entity = useMemo(() => pageData.entities[ 0 ] || {}, [ pageData ]);
  const { data: recordsData, isLoading: recordsLoading, isError } = useGetPageRecordsQuery({
    entityId: entity.id,
    moduleId: pageData.module.id,
  });
  const [performFetchRecordDetails] = useLazyGetRecordDetailsQuery();
  const [ weekOptions, setWeekOptions ] = useState<any>({});
  useEffect(() => {
    const exec = async(): Promise<void> => {
    if ( !recordsData ) {
      setWeekOptions( [] );
    }

    const list = [];

    for (const record of recordsData) {

      const arrInterval = record['interval-ora'].split( '|' );
      const startHour = parseInt( arrInterval[ 0 ].split( ':' )[ 0 ]);
      const startMin = parseInt( arrInterval[ 0 ].split( ':' )[ 1 ]);
      const endHour = parseInt( arrInterval[ 1 ].split( ':' )[ 0 ]);
      const endMin = parseInt( arrInterval[ 1 ].split( ':' )[ 1 ]);
      const item = {
        id: record.id, 
        day: record.dow,
        startHour, 
        startMin, 
        endHour, 
        endMin, 
        name: record._parent.data['full-name'],
        description: '',
        color: record._parent.data.color
      };
      const spec = await performFetchRecordDetails( record._parent.data.specializare );
      const servResult = await performFetchRecordDetails( record['servicii-med'] );

      if (servResult.status === 'fulfilled') {
        item.description += ` ${servResult.data.data.name}`
      }
      if (spec.status === 'fulfilled') {
        item.description += ` ${spec.data.data.name}`
      }

      list.push(item);

    }

    console.log( 'list', list );

    const response = list.reduce(( acc: any, item: any ) => {
      if ( !acc[ item.day ]) {
        acc[ item.day ] = [];
      }

      acc[ item.day ].push( item );

      return acc;
    }, {});

    console.log( 'response', response );

    setWeekOptions( response );
  };
  exec();
  }, [recordsData, recordsLoading]);

  return (
    <Stack gap={2} style={{ height: '100%' }}>
      <Group justify="space-between" align="center" mb="lg">
        <Title order={3}>
          Disponibilitatile saptamanale ale medicilor
        </Title>
        <Group>
          <ActionIcon size="lg" radius="xl" variant="subtle">
            <GoGear size="2.125rem" style={{ margin: '.5rem' }} />
          </ActionIcon>
        </Group>
      </Group>
    <ScrollAreaAutosize style={{ height: '100%' }}>
      {/* <BookingWeekVertical /> */}
      <BookingWeekHorizontal records={weekOptions} />
      <CommonDebugger
        data={recordsData}
        field="data"
      />
    </ScrollAreaAutosize>
    </Stack>
  )
}