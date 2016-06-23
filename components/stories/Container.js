import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Container from '../Container';

const rect = {
  x: 30,
  y: 40,
  width: 200,
  height: 100,
};
storiesOf('Container', module)
  .add('normal', () => (
    <Container {...rect} />
  ));
