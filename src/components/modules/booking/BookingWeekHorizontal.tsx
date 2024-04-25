import { ActionIcon, Badge, Box, Group, Stack, Tooltip } from "@mantine/core";
import { FC, useMemo } from "react";
import css from './booking.module.css';
import { GoPencil, GoTrash } from "react-icons/go";
import { CommonDebugger } from "@uiComponents/common/CommonDebugger";

type TBookingWeekHorizontalProps = {
  records: any;
};

export const BookingWeekHorizontal: FC<TBookingWeekHorizontalProps> = ({
  records
}) => {
  const minutes = useMemo(() => {
    const items = [];

    for (let i = 8; i < 20; i++) {
      for (let j = 0; j < 60; j += 5) {
        items.push({
          hour: i < 10 ? `0${i}` : i,
          minute: j < 10 ? `0${j}` : j,
        });
      }
    }

    return items;
  }, []);
  const days = useMemo(() => {
    return [
      { id: 1, name: 'Luni' },
      { id: 2, name: 'Marti' },
      { id: 3, name: 'Miercuri' },
      { id: 4, name: 'Joi' },
      { id: 5, name: 'Vineri' },
      { id: 6, name: 'Sambata' },
      // { id: 7, name: 'Duminica' },
    ];
  }, []);

  // const records: any = useMemo(() => {
  //   return {
  //     1: [
  //       { 
  //         id: 1, 
  //         day: 1, 
  //         startHour: 9, 
  //         startMin: 0, 
  //         endHour: 12, 
  //         endMin: 30, 
  //         name: 'Meeting 1',
  //         color: '#ff0000'
  //       },
  //       { 
  //         id: 1, 
  //         day: 1, 
  //         startHour: 10, 
  //         startMin: 10, 
  //         endHour: 14, 
  //         endMin: 50, 
  //         name: 'Meeting 2',
  //         color: '#5599ff'
  //       },
  //     ],
  //   }
  // }, []);

  return (
    <Stack id="BookingWrapper" gap={20}>
      <Group 
        align="start"
        justify="start"
        gap={2} 
      >
        <Box className={css.horizontalSidebar} />

        {minutes?.filter(m => m.minute === "00").map((m) => (
          <Box
            key={`${m.hour}:${m.minute}`}
            className={css.horizontalHour}
          >
            {m.hour}:{m.minute}
          </Box>
        ))}
      </Group>

      {days.map((d) => (
        <Stack 
          gap={2}
          key={d.id}
        >
          <Group
            justify="start"
            align="center"
            gap={0}
          >
            <b
              className={css.horizontalSidebar}
              style={{
                lineHeight: '2rem',
              }}
            >
              {d.name}
            </b>
            {minutes.map((m) => (
              <Tooltip
                key={`day1_${m.hour}:${m.minute}`}
                label={`${d.name} ${m.hour}:${m.minute}`}
                position="top-start"
                withArrow
              >
                <Box 
                  className={`${css.horizontalCell} ${m.minute === "00" ? css.horizontalFix : ''}`}
                ></Box>
              </Tooltip>
            ))}
          </Group>

          {records[d.id]?.map((r: any) => (
          <Group
            key={`recprd_${r.id}_row`}
            justify="start"
            align="start"
            gap={0}
          >
            <Box 
              className={css.horizontalSidebar}
            >
              <Badge
                variant="dot"
                color={r.color}
              >
                {r.name}
              </Badge>
            </Box>

            <Box
              data-starth={r.startHour}
              data-offset={(r.startHour-7) * 12 + (r.startMin / 5)}
              style={{
                backgroundColor: 'greenyellow',
                flex: (r.startHour-7) * 12 + (r.startMin / 5)
              }}
            />
            <Box
              data-offset={(r.endHour - r.startHour) * 12 + ((r.endMin - r.startMin) / 5)}
              style={{
                backgroundColor: r.color,
                minHeight: '2rem',
                borderRadius: '5px',
                flex: (r.endHour - r.startHour) * 12 + ((r.endMin - r.startMin) / 5)
              }}
            >
              <Group 
                justify="space-between" 
                gap={0}
                style={{
                  padding: '.1rem .5rem',
                }}
              >
                <Stack 
                  gap={0} 
                  style={{
                    maxWidth: 'calc(100% - 4rem)',
                  }}
                >
                  <b style={{
                    color: 'white',
                    fontSize: '.8rem',
                    lineHeight: '1rem',
                    textShadow: '1px 1px 1px rgba(0,0,0,.2)'
                  }}>
                    {r.description} 
                  </b>
                  <small style={{
                    color: 'white',
                    fontSize: '.8rem',
                    textShadow: '1px 1px 1px rgba(0,0,0,.2)'
                  }}>
                    {r.startHour < 10 ? `0${r.startHour}` : r.startHour}:{r.startMin < 10 ? `0${r.startMin}` : r.startMin} - {r.endHour}:{r.endMin}
                  </small>
                </Stack>
                <Group gap={0} className={css.horizontalCellActions}>
                  <ActionIcon size="md" radius="xl" variant="subtle">
                    <GoPencil size="1rem" color="white" />
                  </ActionIcon>
                  <ActionIcon size="md" radius="xl" variant="subtle">
                    <GoTrash size="1rem"  color="white" />
                  </ActionIcon>
                </Group>
              </Group>
            </Box>
            <Box
              data-offset={(22 - r.endHour) * 12 - (r.endMin / 5)}
              style={{
                flex: (22 - r.endHour) * 12 - (r.endMin / 5)
              }}
            />
          </Group>

          ))}

        </Stack>

      ))}



{/* 
          {days?.map((d) => (
            <div 
              key={d.id}
              className={css.fix}
            >
              {d.name}
            </div>
          ))} */}

          {/* {minutes?.filter(m => m.minute === "00").map((m) => (
            <div 
              key={`${m.hour}:${m.minute}`}
              className={`${css.hour} ${m.minute === "00" ? css.fix : ''}`}
            >{m.hour}:{m.minute}</div>
          ))} */}


          {/* <CommonDebugger data={records} field="" /> */}
        </Stack>

        // {days?.map((d) => (
        // <Stack
        //   id="Day1"
        //   gap={0}
        //   align="start"
        //   justify="start"
        //   style={{ flex: 1 }}
        // >
        //   <Group align="center" justify="center" w="100%">
        //     {d.name}
        //   </Group>
        //   {minutes?.map((m) => (
        //     <Tooltip
        //       key={`day1_${m.hour}:${m.minute}`}
        //       label={`${d.name} ${m.hour}:${m.minute}`}
        //       position="top-start"
        //       withArrow
        //     >
        //     <div 
        //       className={`${css._5min} ${m.minute === "00" ? css.fix : ''}`}></div>
        //       </Tooltip>
        //   ))}
        // </Stack>
        // ))}


  );
}