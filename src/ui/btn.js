import React, { useCallback } from 'react';
import { css } from 'emotion';

const Button = ({ label, onClick }) => {
  return (
    <>
      <button
        className={css`
          text-align: left;
          font-weight: 400;
          &:focus {
            outline: none;
            font-weight: 700;
          }
        `}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
