'use client';

import { ActionIcon, Card, Group, Indicator, Menu, Stack, Text, rem } from '@mantine/core';
import { ITenant } from '@uiDomain/domain.types';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import { GoEyeClosed, GoFileDirectory, GoFileSubmodule, GoKebabHorizontal } from 'react-icons/go';

interface ITenantCardProps {
  tenant: ITenant
}

export const TenantCard: FC<ITenantCardProps> = ({ tenant }) => {
  const tenantDetailsUrl = useMemo(
    () => `/crm/settings/tenants/${tenant.id}`,
    [ tenant.id ]
  );

  return (
    <Card withBorder shadow="md" p="md" className="ndCard">
      <Card.Section p="sm">
        <Group justify="space-between">
          <Group>
            <ActionIcon size={40} variant="transparent">
              <Link href={tenantDetailsUrl}>
                <GoFileDirectory size={24} color="grey" />
              </Link>
            </ActionIcon>
            <Stack gap={0}>
              <Link href={tenantDetailsUrl} style={{ color: 'inherit' }}>
                <Indicator
                  inline
                  color="blue"
                  label={`${tenant.modules?.length}`}
                  size={20}
                  offset={3}
                  position="top-end"
                  disabled={tenant.modules?.length === 0}
                >
                  <Text size="lg" fw={500} mr={16}>
                    {tenant.name}
                  </Text>
                </Indicator>
              </Link>
              <Text size="xs">{tenant.slug}</Text>
            </Stack>
          </Group>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <GoKebabHorizontal size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<GoFileSubmodule size={14} />}>
                <Link href={tenantDetailsUrl}>
                  Details
                </Link>
              </Menu.Item>
              <Menu.Item leftSection={<GoEyeClosed size={14} />} color="red">
                Disable tenant
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
    </Card>
  );
};
