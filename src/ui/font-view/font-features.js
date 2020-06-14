import React, { memo, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import Accordion from '../../ui/accordion';

import Checkbox from '../input-checkbox';

import { otFeatures } from '../../constants';

const FontFeatures = ({
  visible,
  fontFeatures,
  onFontFeatureChange,
  ...rest
}) => {
  //
  const featureKeys = useMemo(() => Object.keys(fontFeatures), []);

  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding-top: 1rem;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <div
            className={css`
              grid-column: 2 / span 6;
              display: grid;
              grid-template-columns: repeat(6, minmax(0, 1fr));
              grid-gap: 1.5rem;
            `}
          >
            {featureKeys.map((key) => (
              <div
                key={key}
                className={css`
                  display: block;
                `}
              >
                <Checkbox
                  name={key}
                  label={otFeatures[key].title}
                  checked={fontFeatures[key]}
                  onChange={onFontFeatureChange}
                />
              </div>
            ))}
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontFeatures);
