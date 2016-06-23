import React, { Component, PropTypes } from 'react';

export default class Ticker extends Component {
  static propTypes = {
    onTick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.tickTimes = 0;
    this.stopped = false;
  }

  tick = () => {
    if (this.stopped) return;
    this.tickTimes += 1;
    this.props.onTick(this.tickTimes);
    requestAnimationFrame(this.tick);
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    this.stopped = true;
    this.tickTimes = 0;
  }

  render() {
    return (
      <div></div>
    );
  }
}
