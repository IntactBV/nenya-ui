import { ActionIcon, Badge, Card, Group, Menu, Stack, Text } from '@mantine/core';
import { TRealm } from '@uiDomain/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GoContainer, GoEye, GoEyeClosed, GoFileSubmodule, GoGlobe, GoKebabHorizontal } from 'react-icons/go';
import { RealmMenu } from '../RealmMenu/RealmMenu';

type TRealmCardProps = {
  realm: TRealm;
};

export const RealmCard: FC<TRealmCardProps> = ({ realm }) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const handleCardClick = () => {
    push( `/crm/realms/${realm.id}` );
  };
  return (
    <Card shadow="sm" padding="md" radius="md" className={`ndCard ${realm.status ? 'ndCard_enabled' : 'ndCard_disabled'}`}>

      <Group justify="space-between">
        <Group justify="flex-start" onClick={handleCardClick}>
          <GoGlobe size={24} />

          <Stack gap={0}>
            <Text size="xl">
              {realm.name}
            </Text>
            <Badge variant="outline" size="sm">
              {realm.slug}
            </Badge>
          </Stack>
        </Group>

        <RealmMenu realm={realm} />
      </Group>

    </Card>
  );
};
