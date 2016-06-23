import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  general: {
    position: 'absolute',
    backgroundColor: 'green',
  }
});

export default class Container extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  render() {
    const dStyles = {
      rect: {
        left: this.props.x,
        top: this.props.y,
        width: this.props.width,
        height: this.props.height,
      }
    };
    return (
      <div className={css(styles.general)} style={dStyles.rect}></div>
    );
  }
}
