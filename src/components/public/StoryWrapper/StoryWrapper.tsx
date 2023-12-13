import { ComponentPreview } from '@uiComponents/public/ComponentPreview/ComponentPreview';
import { CanvasAttributes } from '@/src/domain/types';

interface StoryWrapperProps {
  attributes: CanvasAttributes;
  component: React.FC<any>;
}

export function StoryWrapper({ attributes, component: Component }: StoryWrapperProps ) {
  return (
    <ComponentPreview canvas={attributes.canvas} withSpacing>
      <Component {...( attributes.props || null )} />
    </ComponentPreview>
  );
}
