'use client';

import { Title, Text, Anchor, Stack, SimpleGrid, Card, Group, Button } from '@mantine/core';
import Link from 'next/link';
import { useAuth } from '@/src/domain/contexts/AuthProvider';
import classes from './SettingsScreen.module.css';

export function SettingsScreen() {
  const { currentUser } = useAuth();

  return (
    <Stack>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'white', to: 'violet' }}>
          Settings
        </Text>
      </Title>

      <Text c="dimmed" ta="center" size="lg" mx="auto" my="xl">
        This is the place where admin can manage application structure
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 1, md: 2, xl: 3 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        <Card>
          <Title>Attributes</Title>
          <Text>List of supported attributes</Text>

          <Group justify="end">
            <Link href="/crm/settings/attributes">
              <Button variant="subtle">Manage attributes</Button>
            </Link>
          </Group>
        </Card>
        <Card>
          <Title>Entities</Title>
          <Text>List of supported entities</Text>
          <Group justify="end">
            <Link href="/crm/settings/entities">
              <Button variant="subtle">Manage entities</Button>
            </Link>
          </Group>
        </Card>
        <Card>
          <Title>Modules</Title>
          <Text>List of supported modules</Text>
          <Group justify="end">
            <Link href="/crm/settings/modules">
              <Button variant="subtle">Manage modules</Button>
            </Link>
          </Group>
        </Card>
        <Card>
          <Title>Tenants</Title>
          <Text>List of application tenants</Text>
          <Group justify="end">
            <Link href="/crm/settings/tenants">
              <Button variant="subtle">Manage tenants</Button>
            </Link>
          </Group>
        </Card>
      </SimpleGrid>

      {/* <pre>{JSON.stringify( currentUser, null, 2 )}</pre> */}
    </Stack>
  );
}
