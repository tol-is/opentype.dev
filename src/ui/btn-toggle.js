import React, { useCallback } from 'react';
import { css } from 'emotion';

const ButtonToggle = ({ selected, label, onClick }) => {
  return (
    <>
      <button
        className={css`
          padding: 1em 0;
          text-align: left;
          line-height: 1.5;
          font-weight: 400;
          color: #fff;
          background-image: linear-gradient(
            to bottom,
            #ffffff 0%,
            #ffffff 100%
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
