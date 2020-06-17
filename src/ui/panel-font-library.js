import React, { memo, useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import FontLoader from '../containers/font-loader';
import Accordion from './accordion';

const PanelFontLibrary = ({ visible, ...rest }) => {
  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding-top: 1.5rem;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <FontLoader />
        </div>
      </Accordion>
    </>
  );
};

export default memo(PanelFontLibrary);
