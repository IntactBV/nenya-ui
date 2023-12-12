import { Button, Stack, Text, Title } from '@mantine/core';
import { isNil } from 'lodash';
import { FC } from 'react';
import { GoCloudOffline, GoPlus } from 'react-icons/go';

interface INoDataProps {
  title?: string;
  description: string;
  buttonLabel?: string;
  buttonClickHandler?: () => void;
}

export const NoData: FC<INoDataProps> = ({
  title,
  description,
  buttonLabel,
  buttonClickHandler,
}) => (
  <Stack align="center" justify="center" h="100%">
    <GoCloudOffline size={64} style={{ opacity: 0.5 }} />
    {isNil( title ) && <Title>No data</Title>}
    {!isNil( title ) && <Title>{title}</Title>}
    <Text mb={40}>{ description }</Text>
    {!isNil( buttonLabel ) && (
      <Button
        variant="outline"
        size="lg"
        leftSection={<GoPlus size={30} />}
        onClick={buttonClickHandler}
      >{ buttonLabel }
      </Button>
    )}
  </Stack>
);
