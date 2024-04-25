import { Group, Stack, Tooltip } from "@mantine/core";
import { FC, useMemo } from "react";
import css from './booking.module.css';

export const BookingWeekVertical: FC = ({}) => {
  const minutes = useMemo(() => {
    const items = [];

    for (let i = 7; i < 22; i++) {
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

  return (
      <Group align="start" justify="start" gap={2} mr={15}>

        <Stack id="Hours" gap={0} style={{ width: '60px' }}>
          <Group align="center" justify="center" w="100%">
            Ora
          </Group>
          {minutes?.filter(m => m.minute === "00").map((m) => (
            <div 
              key={`${m.hour}:${m.minute}`}
              className={`${css.hour} ${m.minute === "00" ? css.fix : ''}`}
            >{m.hour}:{m.minute}</div>
          ))}
        </Stack>

        {days?.map((d) => (
        <Stack
          id="Day1"
          gap={0}
          align="start"
          justify="start"
          style={{ flex: 1 }}
        >
          <Group align="center" justify="center" w="100%">
            {d.name}
          </Group>
          {minutes?.map((m) => (
            <Tooltip
              key={`day1_${m.hour}:${m.minute}`}
              label={`${d.name} ${m.hour}:${m.minute}`}
              position="top-start"
              withArrow
            >
            <div 
              className={`${css._5min} ${m.minute === "00" ? css.fix : ''}`}></div>
              </Tooltip>
          ))}
        </Stack>
        ))}

      </Group>

  );
}