import React, { useCallback, useState, useMemo } from 'react';
import { css } from 'emotion';

const FontHeading = ({ children, ...rest }) => {
  return (
    <h2
      {...rest}
      className={css`
        padding: 1rem 0;
        text-align: left;
        font-weight: 400;
        color: #fff;
        font-size: 0.875rem;
        // background-image: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
        // background-repeat: no-repeat;
        // background-position: left top;
        // transition: background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        // background-size: 100% 1px;
      `}
    >
      {children}
    </h2>
  );
};

export default FontHeading;
