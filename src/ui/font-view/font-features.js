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

  console.log();
  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            padding-top: 24px;
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-gap: 20px;
            width: 100%;
            & > * {
              grid-column: span 1;
            }
          `}
        >
          {featureKeys.map((key) => (
            <>
              <Checkbox
                key={key}
                name={key}
                label={otFeatures[key].title}
                checked={fontFeatures[key]}
                onChange={onFontFeatureChange}
              />
            </>
          ))}
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontFeatures);
