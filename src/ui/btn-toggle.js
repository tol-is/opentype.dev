import React, { useCallback } from 'react';
import { css } from 'emotion';

const ButtonToggle = ({ selected, label, onClick }) => {
  return (
    <>
      <button
        className={css`
          text-align: left;
          font-weight: ${selected ? 700 : 400};
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

export default ButtonToggle;
