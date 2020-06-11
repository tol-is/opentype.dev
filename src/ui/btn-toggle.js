import React, { useCallback } from 'react';
import { css } from 'emotion';

const ButtonToggle = ({ selected, label, onClick }) => {
  return (
    <>
      <button
        className={css`
          width: 100%;
          padding: 1em 0;
          text-align: left;
          font-weight: 400;
          background-image: linear-gradient(
            to bottom,
            #000000 0%,
            #000000 100%
          );
          background-repeat: no-repeat;
          background-position: 0 0;
          transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background-size: ${selected ? '100% ' : '0%'} 0.09em;
          &:focus {
            outline: none;
            // font-weight: 700;
          }
          &:hover {
            background-size: 100% 0.09em;
            // font-weight: 700;
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
