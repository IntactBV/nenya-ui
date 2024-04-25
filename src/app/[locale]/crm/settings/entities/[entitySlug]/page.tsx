import { EntityScreen } from '@crmComponents/entities/EntitiesScreen/EntityScreen';

export default function CrmEntityPage({ params }: { params: any }) {
  return (
    <EntityScreen entitySlug={params.entitySlug} />
  );
}
