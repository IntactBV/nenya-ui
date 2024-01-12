import { EntityScreen } from '@uiScreens/crm/Settings/EntitiesScreen/EntityScreen';

export default function CrmEntityPage({ params }: { params: any }) {
  return (
    <EntityScreen entitySlug={params.entitySlug} />
  );
}
