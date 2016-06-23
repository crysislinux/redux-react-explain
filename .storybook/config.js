import { configure } from '@kadira/storybook';

function loadStories() {
  require('../components/stories/Pipe');
  require('../components/stories/Container');
  require('../components/stories/ContainerWithPipe');
  // require as many stories as you need.
}

configure(loadStories, module);
