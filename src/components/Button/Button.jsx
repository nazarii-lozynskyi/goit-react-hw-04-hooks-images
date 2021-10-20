import React from 'react';

import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ onClick, label }) => (
  <button type="button" className={styles.Button} onClick={() => onClick()}>
    {label}
  </button>
);

Button.defaultProps = {
  onClick: () => null,
};

Button.propTypes = {
  onClick: PropTypes.func,

  label: PropTypes.string,
};

export default Button;
