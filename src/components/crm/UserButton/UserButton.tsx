import { UnstyledButton, Group, Avatar, Text, Menu } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { isEmpty } from 'lodash';
import { GoGear } from 'react-icons/go';
import css from './UserButton.module.css';

export function UserButton({ ...others }) {
  const name = 'test';
  const email = 'test';
  const withArrow = true;
  const icon = <IconChevronRight size="0.9rem" stroke={1.5} />;
  const onClick = () => {};
  return (
    <Menu shadow="md" position="right">
      <Menu.Target>
        {/* <Box> */}
        <UnstyledButton className={css.userButton} onClick={onClick} {...others}>
          <Group>
            <Avatar radius="xl" />

            {( !isEmpty( name ) || !isEmpty( email )) && (
              <div style={{ flex: 1 }}>
                <Text size="sm">
                  {name}
                </Text>

                <Text color="dimmed" size="xs">
                  {email}
                </Text>
              </div>
            )}
            { withArrow && ( icon || <IconChevronRight size="0.9rem" stroke={1.5} /> )}
          </Group>
        </UnstyledButton>

        {/* </Box> */}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<GoGear size={14} />}
          onClick={() => {
            // navigate( '/crm-manager' );
          }}
        >
              CRM Manager
        </Menu.Item>
        <Menu.Item
          leftSection={<GoGear size={14} />}
          onClick={() => {
            // navigate( '/app' );
          }}
        >
              CRM App
        </Menu.Item>
        <Menu.Item leftSection={<GoGear size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<GoGear size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          leftSection={<GoGear size={14} />}
          rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<GoGear size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" leftSection={<GoGear size={14} />}>Delete my account</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Sidebar</Menu.Label>
        {/* <Menu.Item icon={accountPreferences.sidebarExpanded ? <GoSidebarExpand size={14} /> : <GoSidebarCollapse size={14} />} onClick={toggleSidebarExanded}>
          {accountPreferences.sidebarExpanded && <Text>
            Collapse
                                                 </Text>}
          {!accountPreferences.sidebarExpanded && <Text>
            Expand
                                                  </Text>}
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
