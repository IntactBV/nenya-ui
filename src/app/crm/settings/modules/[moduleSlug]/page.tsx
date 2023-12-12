import { ModuleScreen } from '@uiComponents/crm/modules/screens/ModuleScreen';

export default function CrmModulePage({ params }: { params: any }) {
  return (
    <ModuleScreen moduleSlug={params.moduleSlug} />
  );
}
