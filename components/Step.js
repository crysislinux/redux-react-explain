import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PlusIcon from 'react-icons/lib/fa/plus-square';

const styles = StyleSheet.create({
  general: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },

  toolbar: {
    position: 'relative',
    zIndex: 1,
    padding: 2,
    height: 16,
  },

  button: {
    cursor: 'pointer',
    float: 'right',
  },

  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class Step extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={css(styles.general)}>
        <div className={css(styles.toolbar)}>
          <PlusIcon className={css(styles.button)} />
        </div>
        <div className={css(styles.content)}>
          {title}
        </div>
      </div>
    );
  }
}

Step.propTypes = {
  title: PropTypes.string,
};
