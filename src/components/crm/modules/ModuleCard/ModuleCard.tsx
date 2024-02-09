import { ActionIcon, Card, Group, Menu, Stack, Text, Title, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IModule } from '@uiDomain/domain.types';
import { useUpdateModuleMutation } from '@uiRepos/modules.repo';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { GoCheck, GoCircleSlash, GoDatabase, GoEye, GoEyeClosed, GoKebabHorizontal, GoPencil, GoTrash } from 'react-icons/go';

interface IModuleCardProps {
  module: IModule;
  onEdit: ( module: IModule ) => void;
  onDelete: ( module: IModule ) => void;
}

export const ModuleCard: FC<IModuleCardProps> = ({ module, onEdit, onDelete }) => {
  const [ performUpdateModule ] = useUpdateModuleMutation();

  const handleModuleEdit = useCallback(() => {
    onEdit( module );
  }, [ module, onEdit ]);

  const handleModuleDelete = useCallback(() => {
    onDelete( module );
  }, [ module, onDelete ]);

  const handleModuleDisable = useCallback( async() => {
    const clone: IModule = { ...module, status: !module.status };

    await performUpdateModule( clone );

    notifications.show({
      title: 'Modules manger',
      message: `The "${module.name}" module has been ${module.status ? 'disabled' : 'enabled'}.`,
      withCloseButton: true,
      icon: <GoCheck size={20} />,
      radius: 'md',
    });
  }, [ module, performUpdateModule ]);

  return (
    <Card
      withBorder
      shadow="md"
      p="md"
      style={{
        opacity: module.status ? 1 : 0.3,
      }}
      className="ndCard"
    >
      <Card.Section p="sm">
        <Group justify="space-between">
          <Group>
            <Link href={`/crm/settings/modules/${module.slug}`}>
              {module.status && <GoDatabase size={24} color="grey" />}
              {!module.status && <GoCircleSlash size={24} color="grey" />}
            </Link>
            <Stack gap={0}>
              <Link href={`/crm/settings/modules/${module.slug}`}>
                <Title order={4}>
                  {module.name}
                </Title>
              </Link>
              <Text>{module.slug}</Text>
            </Stack>
          </Group>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <GoKebabHorizontal size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Link href={`/crm/settings/modules/${module.slug}`} style={{ textDecoration: 'none' }}>
                <Menu.Item leftSection={<GoEye size={14} />}>
                Details
                </Menu.Item>
              </Link>
              <Menu.Item leftSection={<GoPencil size={14} />} onClick={handleModuleEdit}>
                Edit
              </Menu.Item>
              <Menu.Item leftSection={module.status ? <GoEyeClosed size={14} /> : <GoEye size={14} />} color={module.status ? 'orange' : 'green'} onClick={handleModuleDisable}>
                {module.status ? 'Disable' : 'Enable'} module
              </Menu.Item>
              <Menu.Item leftSection={<GoTrash size={14} />} color="red" onClick={handleModuleDelete}>
                Delete module
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
    </Card>
  );
};
