import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/global.css';
import Ticker from '../components/Ticker';

class App extends Component {
  constructor(props) {
    super(props);
    this.tick = 0;
    this.lastRealTick = 0;
    this.handleTick = this.handleTick.bind(this);
  }

  handleTick(tick) {
    if (tick > this.lastRealTick + 60) {
      this.tick += 1;
      this.lastRealTick = tick;
      // console.log(this.tick);
    }
  }

  render() {
    return (
      <div>
        <Ticker onTick={this.handleTick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps, {

})(App);
