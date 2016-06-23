import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Pipe from '../Pipe';

const endPoints = [{ x: 130, y: 70 }, { x: 430, y: 270 }];
const controlPoints = [{ x: 130, y: 250 }, { x: 450, y: 70 }];

storiesOf('Pipe', module)
  .add('normal', () => (
    <Pipe
      start={endPoints[0]}
      end={endPoints[1]}
      controlA={controlPoints[0]}
      controlB={controlPoints[1]}
    />
  ));
