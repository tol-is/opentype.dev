import React from 'react';
import { css } from 'emotion';

export default ({ onChange }) => (
  <div
    className="upload_button"
    tabIndex={-1}
    aria-hidden={true}
    className={css`
      position: relative;
      width: 100%;
      padding: 1em 0;
      text-align: left;
      font-weight: 400;
      background-image: linear-gradient(to bottom, #000000 0%, #000000 100%);
      background-repeat: no-repeat;
      background-position: 0 100%;
      transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      background-size: 0% 0.09em;
      &:focus {
        outline: none;
        // font-weight: 700;
      }
      &:hover {
        background-size: 100% 0.09em;
        // font-weight: 700;
      }
    `}
  >
    Upload
    <input
      multiple
      type="file"
      onChange={onChange}
      className={css`
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        top: 0;
        left: 0;
      `}
    />
  </div>
);
