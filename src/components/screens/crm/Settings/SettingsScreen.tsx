'use client';

import { Title, Text, Stack, SimpleGrid, Card, Group, Button } from '@mantine/core';
import Link from 'next/link';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import css from '@uiComponents/common/Card.module.css';
import { useTranslation } from 'react-i18next';
import classes from './SettingsScreen.module.css';

export function SettingsScreen() {
  const { t } = useTranslation();

  const { currentUser } = useAuth();

  return (
    <Stack>
      <Title className={classes.title} ta="center" mt={20}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'white', to: 'violet' }}>
          {t( 'app.settings.admin.title' )}
        </Text>
      </Title>

      <Text c="dimmed" ta="center" size="lg" mx="auto" my="xl">
        {t( 'app.settings.admin.description' )}
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 1, md: 2, xl: 3 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.attributes.title' )}</Title>
          <Text>{t( 'app.settings.admin.attributes.description' )}</Text>

          <Group justify="end">
            <Link href="/crm/settings/attributes">
              <Button variant="subtle">{t( 'app.settings.admin.attributes.button' )}</Button>
            </Link>
          </Group>
        </Card>

        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.entities.title' )}</Title>
          <Text>{t( 'app.settings.admin.entities.description' )}</Text>
          <Group justify="end">
            <Link href="/crm/settings/entities">
              <Button variant="subtle">{t( 'app.settings.admin.entities.button' )}</Button>
            </Link>
          </Group>
        </Card>

        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.modules.title' )}</Title>
          <Text>{t( 'app.settings.admin.modules.description' )}</Text>
          <Group justify="end">
            <Link href="/crm/settings/modules">
              <Button variant="subtle">{t( 'app.settings.admin.modules.button' )}</Button>
            </Link>
          </Group>
        </Card>

        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.tenants.title' )}</Title>
          <Text>{t( 'app.settings.admin.tenants.description' )}</Text>
          <Group justify="end">
            <Link href="/crm/settings/tenants">
              <Button variant="subtle">{t( 'app.settings.admin.tenants.button' )}</Button>
            </Link>
          </Group>
        </Card>

        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.realms.title' )}</Title>
          <Text>{t( 'app.settings.admin.realms.description' )}</Text>
          <Group justify="end">
            <Link href="/crm/settings/realms">
              <Button variant="subtle">{t( 'app.settings.admin.realms.button' )}</Button>
            </Link>
          </Group>
        </Card>

        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.users.title' )}</Title>
          <Text>{t( 'app.settings.admin.users.description' )}</Text>
          <Group justify="end">
            <Link href="/crm/settings/users">
              <Button variant="subtle">{t( 'app.settings.admin.users.button' )}</Button>
            </Link>
          </Group>
        </Card>

        <Card className="ndCard">
          <Title>{t( 'app.settings.admin.reports.title' )}</Title>
          <Text>{t( 'app.settings.admin.reports.description' )}</Text>
          <Group justify="end">
            <Link href="/crm/settings/users">
              <Button variant="subtle">{t( 'app.settings.admin.reports.button' )}</Button>
            </Link>
          </Group>
        </Card>
      </SimpleGrid>

      {/* <pre>{JSON.stringify( currentUser, null, 2 )}</pre> */}
    </Stack>
  );
}
