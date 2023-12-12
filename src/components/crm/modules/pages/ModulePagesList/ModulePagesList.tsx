import { ActionIcon, Button, Group, Stack, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FC, Suspense, lazy } from 'react';
import { GoArchive, GoCheck, GoPencil, GoPlus, GoTrash } from 'react-icons/go';
import * as ReactIcons from 'react-icons';
import { isEmpty, isNil } from 'lodash';
import * as CI from 'react-icons/ci';
import { notifications } from '@mantine/notifications';
import { useDeleteModulePageMutation } from '@uiRepos/modules.repo';
import { RENDERER_NAMES } from '@uiDomain/domain.constants';
import { ModulePageModal } from '../ModulePageModal/ModulePageModal';

type TModulePagesListProps = {
  moduleId: string,
  pages: any[]
};
const IconsData: Record<string, any> = {};

IconsData.CI = CI;
// IconsData.CI = lazy(() => import( 'react-icons/ci' ));
// for ( const it of ReactIcons.IconsManifest ) {
//   IconsData[ it.id ] = lazy(() => import( `react-icons/${it.id}` ));
// }

export const ModulePagesList: FC<TModulePagesListProps> = ({ moduleId, pages }) => {
  const [ performDeleteModulePage ] = useDeleteModulePageMutation();
  const handleEditClick = ( page: any ) => () => {
    modals.open({
      id: 'modulePageModal',
      title: 'Edit Page',
      children: (
        <ModulePageModal
          moduleId={moduleId}
          page={page}
        />
      ),
    });
  };
  const handleDeleteClick = ( page: any ) => () => {
    const managerTitle = 'Module pages manager';
    modals.openConfirmModal({
      title: managerTitle,
      children: (
        <Text size="sm">
                    Please confirm that you want to remove module page <b>{page.name}</b>
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log( 'Cancel' ),
      onConfirm: async() => {
        try {
          await performDeleteModulePage({ id: page.id });
          notifications.show({
            title: managerTitle,
            message: `The module page "${page.name}" has been removed.`,
            withCloseButton: true,
            color: 'orange',
            icon: <GoCheck size={20} />,
            radius: 'md',
            withBorder: true,
          });
        } catch ( e: any ) {
          notifications.show({
            title: 'Attributes manger',
            message: `Could not remove module page "${page.name}".`,
            withCloseButton: true,
            color: 'red',
            icon: <GoCheck size={20} />,
            radius: 'md',
          });
          console.error( e.message );
        }
      },
    });
  };
  return (
    <Stack>
      <Table miw={800} verticalSpacing="md" stickyHeader>
        <TableThead>
          <TableTh>&nbsp;</TableTh>
          <TableTh>Page name</TableTh>
          <TableTh>Description</TableTh>
          <TableTh>Type</TableTh>
          <TableTh>Status</TableTh>
        </TableThead>
        <TableTbody>
          {pages.map(( page: any, index ) => {
            let Icon = GoArchive;
            // console.log( ReactIcons.IconBase );
            console.log( ReactIcons.IconsManifest );

            if (
              !isEmpty( page.iconType ) &&
              !isEmpty( page.icon )) {
            // const iconsType: any = ReactIcons[ page.iconType ];
            //   !isNil( ReactIcons[ page.iconType ]) &&
            //   !isNil( ReactIcons[ page.iconType ][ icon ])
            // ) {
              Icon = IconsData[ page.iconType.toUpperCase() ][ page.icon ];
            // Icon = ReactIcons.IconBase;
            // Icon = lazy(() => import( `react-icons/${page.iconType}` ));
            }
            return (
              <TableTr key={index}>
                <TableTd width={20}>
                  <Suspense fallback={<div>Loading</div>}>
                    <Icon size={20} />
                    {/* <IconsData.CI.CiBarcode /> */}
                    {/* {JSON.stringify( IconsData )} */}
                  </Suspense>
                </TableTd>
                <TableTd>
                  <Stack gap={0}>
                    <Title order={4}>{page.name}</Title>
                    <Text>{page.slug}</Text>
                  </Stack>
                </TableTd>
                <TableTd>
                  { page.description }
                </TableTd>
                <TableTd>
                  {isNil( RENDERER_NAMES ) ? 'unknown' : RENDERER_NAMES[ page.pageType ]}
                </TableTd>
                <TableTd>
                  { page.status.toString() }
                </TableTd>
                <TableTd>
                  <Group justify="center">
                    <Tooltip label="Edit attribute" position="left" withArrow color="blue">
                      <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleEditClick( page )}>
                        <GoPencil size="2.125rem" style={{ margin: '.5rem' }} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Remove attribute" position="left" withArrow color="blue">
                      <ActionIcon color="teal" size="lg" radius="xl" variant="default" onClick={handleDeleteClick( page )}>
                        <GoTrash size="2.125rem" style={{ margin: '.5rem' }} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </TableTd>
                {/* <TableTd>
                  {JSON.stringify( page )}
                </TableTd> */}
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
    </Stack>
  );
};
