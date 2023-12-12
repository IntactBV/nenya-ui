import { CanvasAttributes } from '@/src/domain/types';
import { ComponentPreview } from '@/src/components/ComponentPreview/ComponentPreview';

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
