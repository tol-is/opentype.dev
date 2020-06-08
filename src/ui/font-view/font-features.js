import React, { memo, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Accordion from '../../ui/accordion';

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
        <fieldset>
          {featureKeys.map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                name={key}
                checked={fontFeatures[key]}
                onChange={onFontFeatureChange}
              />
              {otFeatures[key].title}
            </label>
          ))}
        </fieldset>
      </Accordion>
    </>
  );
};

export default memo(FontFeatures);
