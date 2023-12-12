import { StoryWrapper } from '@/src/components/StoryWrapper/StoryWrapper';
import attributes from './attributes.json';
import { UserButton } from './UserButton';

const ButtonStory = () => (
  <StoryWrapper attributes={attributes} component={UserButton} />
);

export default ButtonStory;
