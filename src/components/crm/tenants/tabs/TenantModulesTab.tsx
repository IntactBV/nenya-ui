import { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { GoAlert } from 'react-icons/go';
import { Loader, Stack, Text, Title } from '@mantine/core';
import { useGetActiveModulesQuery } from '@uiRepos/modules.repo';
import { useToggleModuleToTenantMutation, useUpdateTenantModulesOrderMutation } from '@uiRepos/tenants.repo';
import { IModule, ITenant, TOrderedItem } from '@uiDomain/domain.types';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { sortBy } from 'lodash';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';
import { TenantModuleCard } from '../cards/TenantModuleCard';

const sortOrder = ( items: Record<string, number> ) => ( a: any, b: any ) => {
  const aOrder = items[ a.id ] || 1000;
  const bOrder = items[ b.id ] || 1000;
  console.log( aOrder, bOrder );
  return bOrder - aOrder;
};

export const TenantModulesTab: FC<{ tenant: ITenant }> = ({ tenant }) => {
  const { tenantId } = useParams();
  const { data: activeModules, isLoading, error, isError } = useGetActiveModulesQuery();
  const [ performToggleModule, toggleModuleStatus ] = useToggleModuleToTenantMutation();
  const [ performUpdateOrder, orderStatus ] = useUpdateTenantModulesOrderMutation();
  // const [ items, setItems ] = useState<TOrderedItem[]>( tenant.modules );
  const items = useMemo(() => tenant.modules.reduce(( acc: Record<string, number>, v, index ) => {
    acc[ v.id ] = v.order;
    return acc;
  }, {}), [ tenant.modules ]);
  const preparedModules = useMemo(
    () => {
      if ( !activeModules ) {
        return [];
      }
      return [ ...activeModules ]?.sort( sortOrder( items ));
    },
    [ activeModules, tenant.modules ]
  );

  const handleDragEnd = async({ destination, source }: DropResult ) => {
    const initialOrder = preparedModules.map(( item, idx ) => ({
      id: item.id,
      name: item.name,
      newOrder: idx * 10,
    }));
    const sourceItem = initialOrder[ source.index ];
    sourceItem.newOrder = destination.index * 10 - 5;
    console.log( 'onDragEnd', initialOrder );
    const newOrder = sortBy( initialOrder, 'newOrder' )
      .reduce(( acc: Record<string, number>, item: any, idx ) => {
        acc[ item.id ] = idx * 10;
        return acc;
      }, {});
    console.log( 'newOrder', newOrder );
    const result = await performUpdateOrder({
      tenantId,
      body: newOrder,
    });
    console.log( result );
  };

  const toggleModuleSelection = useCallback(( moduleId: string, isSelected: boolean ) => {
    performToggleModule({
      tenantId,
      moduleId,
      isSelected,
    });
  }, [ tenantId, performToggleModule ]);

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
      <CommonPageLoader />
    );
  }

  return (
    <Stack style={{
      opacity: orderStatus.isLoading ? 0.1 : 1,
    }}>

      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {( provided ) => (

            <Stack
              gap="lg"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {preparedModules.map(( module: IModule, index: number ) => (
                <TenantModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  isSelected={tenant.modules.map( tm => tm.id ).includes( module.id as string )}
                  onChange={( moduleId: string, isSelected: boolean ) => {
                    toggleModuleSelection(
                      moduleId,
                      isSelected
                    );
                  }}
                /> ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>

      {/* <CommonDebugger data={items} field="items" /> */}
      {/* <CommonDebugger data={tenant} field="tenant" /> */}

    </Stack>
  );
};
