import { FC, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { GoAlert } from 'react-icons/go';
import { Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useGetActiveModulesQuery } from '@uiRepos/modules.repo';
import { useToggleModuleToTenantMutation } from '@uiRepos/tenants.repo';
import { IModule, ITenant } from '@uiDomain/domain.types';
import { TenantModuleCard } from '../cards/TenantModuleCard';

export const TenantModulesTab: FC<{ tenant: ITenant }> = ({ tenant }) => {
  const { tenantId } = useParams();
  const { data: activeModules, isLoading, error, isError } = useGetActiveModulesQuery();
  const [ preformToggleModule, toggleModuleStatus ] = useToggleModuleToTenantMutation();

  const toggleModuleSelection = useCallback(( moduleId: string, isSelected: boolean ) => {
    preformToggleModule({
      tenantId,
      moduleId,
      isSelected,
    });
  }, [ tenantId, preformToggleModule ]);

  if ( isError ) {
    return (
      <Stack align="center" h={600} justify="center">
        <GoAlert size={60} style={{ opacity: 0.5 }} />
        <Title style={{ fontFamily: 'Montserrat' }}>{error.status}</Title>
        <Text>{error.error}</Text>
      </Stack>
    );
  }

  if ( isLoading ) {
    return (
      <Stack align="center" h={600} justify="center">
        <Loader size="xl" />
      </Stack>
    );
  }

  return (
    <Stack>

      <SimpleGrid
        cols={3}
        spacing="lg"
      // breakpoints={[
      //   { maxWidth: '86rem', cols: 2, spacing: 'md' },
      //   { maxWidth: '64rem', cols: 1, spacing: 'sm' },
      // ]}
      >
        {activeModules.map(( module: IModule ) => (
          <TenantModuleCard
            key={module.id}
            module={module}
            isSelected={tenant.moduleIds?.includes( module.id as string )}
            onChange={( moduleId: string, isSelected: boolean ) => {
              toggleModuleSelection(
                moduleId,
                isSelected
              );
            }}
          /> ))}
      </SimpleGrid>

      {/* <pre>
     mod: {JSON.stringify( tenant.moduleIds )} <br />
    toggleModuleStatus: {JSON.stringify( toggleModuleStatus, null, 2 )}
    </pre> */}
    </Stack>
  );
};
