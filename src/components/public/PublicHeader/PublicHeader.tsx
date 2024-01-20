'use client';

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import { isNil } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@uiStore/hooks';
import { selectAccount } from '@uiStore/features/account/account.selectors';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/domain/contexts/AuthProvider';
import classes from './PublicHeader.module.css';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function PublicHeader() {
  const { t } = useTranslation();
  const [ drawerOpened, { toggle: toggleDrawer, close: closeDrawer } ] = useDisclosure( false );
  const [ linksOpened, { toggle: toggleLinks } ] = useDisclosure( false );
  const theme = useMantineTheme();
  // const storeAccount = useAppSelector( selectAccount );
  const { currentUser, logout } = useAuth();
  const isAuthenticated = useMemo(() =>
    !isNil( currentUser ), [ currentUser ]
  );
  const router = useRouter();

  const handleLogout = useCallback( async() => {
    try {
      await logout();
    } catch ( e: any ) {
      console.warn( e.code );
    }
    router.push( '/', { scroll: false });
  }, [ logout ]);

  // useEffect(() => {
  //   console.log( '### storeAccount: ', storeAccount );
  // }, [ storeAccount ]);

  const links = mockdata.map(( item ) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem( 22 ), height: rem( 22 ) }}
            color={theme.colors.blue[ 6 ]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>

            <Image
              src="/favicon.png"
              alt="Nenya Digital"
              width={48}
              height={48}
              style={{ borderRadius: '10px' }}
            />

            <Link href="/" style={{ textDecoration: 'none' }}>
              <Title order={1}>
                <Text inherit variant="text" component="span">
            nenya.
                </Text>
                <Text inherit variant="text" component="span">
            digital
                </Text>
              </Title>
            </Link>
          </Group>

          {/* <MantineLogo size={30} /> */}

          {/* <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem( 16 ), height: rem( 16 ) }}
                      color={theme.colors.blue[ 6 ]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>
 */}
          <Group visibleFrom="sm">
            {!isAuthenticated && (
              <>
                <Button component="a" href="/public/login" variant="default">Autentificare</Button>
                <Button component="a" href="/public/signup">Inregistrare</Button>
              </>
            )}
            {isAuthenticated &&
            <>
              {currentUser.email}
              <Button onClick={handleLogout}>Parasire cont</Button>
            </>
            }
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem( 80 )})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem( 16 ), height: rem( 16 ) }}
                color={theme.colors.blue[ 6 ]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy2
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button component="a" href="/public/login" variant="default">{t( 'login' )}</Button>
            <Button component="a" href="/public/signup">{t( 'signup' )}</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
