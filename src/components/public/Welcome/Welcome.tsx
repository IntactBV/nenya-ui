'use client';

import { Title, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './Welcome.module.css';

export function Welcome() {
  const { t } = useTranslation();

  return (
    <>
      <Title className={classes.title} ta="center" my={120}>
        {t( 'welcome_to' )}{' '}<br />
        <span style={{
          wordBreak: 'keep-all',
        }}>
          <Text inherit variant="gradient" component="span" gradient={{ from: 'violet', to: '#eee' }}>
            Nenya
          </Text>
          &nbsp;
          <Text inherit variant="gradient" component="span" gradient={{ from: '#eee', to: 'purple' }}>
            Digital
          </Text>
        </span>
      </Title>
      <Text c="dimmed" ta="justify" size="lg" maw={580} mx="auto" mt="xl">
        {t( 'main_description' )}
      </Text>
    </>
  );
}
