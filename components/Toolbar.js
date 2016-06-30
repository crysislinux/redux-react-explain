import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  group: {
    display: 'inline-block',
    margin: '0 4px',
  },

  button: {
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
  },

  toolbar: {
    position: 'relative',
    padding: '4px',
    border: '#ccc 1px solid',
    display: 'inline-block',
  },
});

export const Group = ({ children }) => (
  <div className={css(styles.group)}>
    {children}
  </div>
);

Group.propTypes = {
  children: PropTypes.element
};

export const Button = ({ icon, ...rest }) => {
  const Icon = icon; // must capitalized, or will be treated as a native html tag.
  return (
    <button className={css(styles.button)} {...rest} >
      <Icon size={18} />
    </button>
  );
};

Button.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const Toolbar = ({ children }) => (
  <div className={css(styles.toolbar)}>
    {children}
  </div>
);

Toolbar.propTypes = {
  children: PropTypes.node,
};

export default Toolbar;
