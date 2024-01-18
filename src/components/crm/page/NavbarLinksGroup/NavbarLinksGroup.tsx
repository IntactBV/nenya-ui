import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './NavbarLinksGroup.module.scss';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string; isActive?: boolean }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps ) {
  const path = usePathname();
  const hasLinks = Array.isArray( links );
  const [ opened, setOpened ] = useState( initiallyOpened || false );
  const items = ( hasLinks ? links : []).map(( link ) => {
    let elClass = classes.link;
    if ( link.link === path ) {
      elClass += ` ${classes.selected}`;
    }
    return (
      <Link
        className={elClass}
        href={link.link}
        key={link.label}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <>
      <UnstyledButton onClick={() => setOpened(( o ) => !o )} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem( 18 ), height: rem( 18 ) }} />
            </ThemeIcon>
            <Text ml="md" className="title" fw={700}>{label}</Text>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem( 16 ),
                height: rem( 16 ),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}
