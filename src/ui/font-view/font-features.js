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
            padding-top: 24px;
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            grid-auto-rows: minmax(2em, auto);
            grid-gap: 24px;
            width: 100%;
          `}
        >
          {featureKeys.map((key) => (
            <div
              className={css`
                display: block;
              `}
            >
              <Checkbox
                key={key}
                name={key}
                label={otFeatures[key].title}
                checked={fontFeatures[key]}
                onChange={onFontFeatureChange}
              />
            </div>
          ))}
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontFeatures);
