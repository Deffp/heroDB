import React from 'react';
import classNames from 'classnames';

function Button({ onClick, children, className }) {
  return (
    <button className={classNames(`button-${className}`)} onClick={() => onClick()}>
      {children}
    </button>
  );
}

export default Button;
