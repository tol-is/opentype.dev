import React, { memo } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import Accordion from '../accordion';
import Slider from '../input-range';
import Checkbox from '../input-checkbox';

const FontVariations = ({
  visible,
  values,
  variationAxes,
  variationsNames,
  selectedVariation,
  onVariationAxisChange,
  onNamedVariationSelect,
  ...rest
}) => {
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
          <div
            className={css`
              grid-column: 3 / span 1;
              display: grid;
              grid-template-columns: repeat(1, minmax(0, 1fr));
              grid-gap: 1rem;
            `}
          >
            {Object.keys(variationAxes).map((k) => (
              <div key={k}>
                <Slider
                  name={k}
                  label={variationAxes[k].name}
                  min={variationAxes[k].min}
                  max={variationAxes[k].max}
                  step={1}
                  value={values[k]}
                  onChange={onVariationAxisChange}
                />
              </div>
            ))}
          </div>
          {variationsNames.length > 0 && (
            <div
              className={css`
                padding-top: 1.5rem;
                grid-column: 1 / span 7;
                display: grid;
                grid-template-columns: repeat(7, minmax(0, 1fr));
                grid-gap: 1.5rem;
              `}
            >
              {variationsNames.map((key) => (
                <div>
                  <Checkbox
                    key={key}
                    name={key}
                    label={key}
                    checked={selectedVariation === key}
                    onChange={() => onNamedVariationSelect(key)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontVariations);
