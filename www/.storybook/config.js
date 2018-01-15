import { configure } from '@storybook/angular';

function loadStories() {
  require('../app/stories/index.ts');
}

configure(loadStories, module);