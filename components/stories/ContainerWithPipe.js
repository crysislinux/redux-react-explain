import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Container from '../Container';
import Pipe from '../Pipe';
import Step from '../Step';

const rect1 = {
  x: 30,
  y: 40,
  width: 200,
  height: 100,
};

const points = [
  { x: 230, y: 90 },
  { x: 280, y: 100 },
  { x: 250, y: 200 },
  { x: 300, y: 200 },
];

const rect2 = {
  x: 300,
  y: 150,
  width: 200,
  height: 100,
};

storiesOf('ContainerWithPipe', module)
  .add('normal', () => (
    <div>
      <Container {...rect1}>
        <Step title="Dispatch Begin" />
      </Container>
      <Container {...rect2}>
        <Step title="Middleware" />
      </Container>
      <Pipe points={points} progress={60} />
    </div>
  ));
