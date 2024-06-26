import React from 'react';
import { css } from 'emotion';

export default ({ onChange }) => (
  <div
    className="upload_button"
    tabIndex={-1}
    aria-hidden={true}
    className={css`
      position: relative;
      padding: 1em 0;
      display: inline-block;
      text-align: left;
      line-height: 1;
      font-weight: 400;
      background-image: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
      background-repeat: no-repeat;
      background-position: 0 100%;
      transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      background-size: 0% 1px;
      &:focus {
        outline: none;
      }
      &:hover {
        background-size: 100% 1px;
      }
    `}
  >
    Fonts
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
