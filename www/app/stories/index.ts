import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IdiomMainDisplayComponent } from '../idioms/idiom-main-display.component';

storiesOf('My Button', module)
  .add('with some emoji', () => ({
    component: IdiomMainDisplayComponent,
    props: {
      text: ['1','2','3','4'],
    },
  }));