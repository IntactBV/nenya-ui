import { ActionIcon, Box, Button, Group, Stack, Text, Title, rem } from '@mantine/core';
import { isEmpty, isNil } from 'lodash';
import Link from 'next/link';
import { FC } from 'react';
import { GoChevronLeft, GoPlus } from 'react-icons/go';

interface IPageHeaderProps {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonClickHandler?: () => void;
  backButtonUrl?: string;
}

export const PageHeader: FC<IPageHeaderProps> = ({
  title,
  description,
  buttonLabel,
  buttonClickHandler,
  backButtonUrl,
}) => (
  <Group justify="space-between">
    <Group>
      {!isEmpty( backButtonUrl ) && (
        <Link href={backButtonUrl || ''}>
          <ActionIcon p={5} size={40} mb={20}>
            <GoChevronLeft size={rem( 34 )} />
          </ActionIcon>
        </Link>
      )}
      <Stack gap={0}>
        <Title>{title}</Title>
        <Text>{description}&nbsp;</Text>
      </Stack>
    </Group>
    {!isNil( buttonLabel ) && (
      <Box>
        <Button
          variant="gradient"
          size="md"
          onClick={buttonClickHandler}
          leftSection={<GoPlus size={30} />}
        >
          {buttonLabel}
        </Button>
      </Box>
    )}
  </Group>

);
