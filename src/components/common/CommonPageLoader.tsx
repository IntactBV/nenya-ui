import { Loader, Stack, Text } from '@mantine/core';
import { isNil } from 'lodash';
import { FC } from 'react';

interface ICommonPageLoaderProps {
  message?: string;
}

export const CommonPageLoader: FC<ICommonPageLoaderProps> = ({ message }) => (
  <Stack align="center" h={600} justify="center">
    <Loader size="xl" />
    {!isNil( message ) && <Text>{message}</Text>}
  </Stack>
);
