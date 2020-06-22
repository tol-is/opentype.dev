import React, { memo, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import Accordion from '../accordion';

import Checkbox from '../input-checkbox';

import { otFeatures } from '../../constants';

const FontFeatures = ({ visible, features, onFontFeatureChange, ...rest }) => {
  //
  const featureKeys = useMemo(() => Object.keys(features), []);

  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <ul
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding: 1.5rem 0;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-column-gap: 1.5rem;
            grid-row-gap: 1rem;
            width: 50%;
          `}
        >
          {featureKeys.map((key) => (
            <li
              key={key}
              className={css`
                display: block;
              `}
            >
              <Checkbox
                name={key}
                label={otFeatures[key].title}
                checked={features[key]}
                onChange={onFontFeatureChange}
              />
            </li>
          ))}
        </ul>
      </Accordion>
    </>
  );
};

export default memo(FontFeatures);
