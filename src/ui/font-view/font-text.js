import React, { memo } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import Accordion from '../accordion';
import Slider from '../input-range';
import Checkbox from '../input-checkbox';

const FontText = ({ visible, ...rest }) => {
  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding-bottom: 1.5rem;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          TEXT SAMPLES
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontText);
