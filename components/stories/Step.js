import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Step from '../Step';

storiesOf('Step', module)
  .add('normal', () => (
    <Step />
  ));
