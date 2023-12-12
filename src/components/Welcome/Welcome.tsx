'use client';

import { Title, Text, Anchor } from '@mantine/core';
import { useAuth } from '@/src/domain/contexts/AuthProvider';
import classes from './Welcome.module.css';

export function Welcome() {
  const { currentUser } = useAuth();

  return (
    <>
      <Title className={classes.title} ta="center" my={120}>
        Bine ati venit la{' '}<br />
        <span style={{
          wordBreak: 'keep-all',
        }}>
          <Text inherit variant="gradient" component="span" gradient={{ from: 'purple', to: 'orange' }}>
            Nenya
          </Text>
          &nbsp;
          <Text inherit variant="gradient" component="span" gradient={{ from: 'violet', to: 'blue' }}>
            Digital
          </Text>
        </span>
      </Title>
      <Text c="dimmed" ta="justify" size="lg" maw={580} mx="auto" mt="xl">
        NenyDigital is a revolutionary digitalization platform that seamlessly integrates CRM and CMS capabilities, empowering businesses to cultivate meaningful customer relationships and achieve sustainable growth. By streamlining customer data management, content creation, and marketing automation, NenyDigital enables organizations to provide personalized customer experiences across all touchpoints.
      </Text>
      {/* <pre>{JSON.stringify( currentUser, null, 2 )}</pre> */}
    </>
  );
}
