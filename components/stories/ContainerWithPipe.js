import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Container from '../Container';
import Pipe from '../Pipe';

const rect1 = {
  x: 30,
  y: 40,
  width: 200,
  height: 100,
};

const points = {
  start: { x: 230, y: 90 },
  end: { x: 300, y: 200 },
  controlA: { x: 280, y: 100 },
  controlB: { x: 250, y: 200 },
};

const rect2 = {
  x: 300,
  y: 150,
  width: 200,
  height: 100,
};

storiesOf('ContainerWithPipe', module)
  .add('normal', () => (
    <div>
      <Container {...rect1} />
      <Container {...rect2} />
      <Pipe {...points} />
    </div>
  ));
