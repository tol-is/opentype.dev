import React from 'react';
import { css } from 'emotion';

export default ({ onChange }) => (
  <div
    className="upload_button"
    tabIndex={-1}
    aria-hidden={true}
    className={css`
      position: relative;
      padding: 1rem 2rem;
    `}
  >
    UPLOAD
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
