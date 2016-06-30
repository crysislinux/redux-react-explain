import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Toolbar, { Button, Group } from '../Toolbar';
import PlayIcon from 'react-icons/lib/fa/play';
import PauseIcon from 'react-icons/lib/fa/pause';

storiesOf('Toolbar', module)
  .add('normal', () => (
    <Toolbar>
      <Group>
        <Button icon={PlayIcon} onClick={() => { console.log('I am a button'); }} />
      </Group>
      <Group>
        <Button icon={PauseIcon} />
      </Group>
      <Group>
        <Button icon={PlayIcon} />
      </Group>
    </Toolbar>
  ));
