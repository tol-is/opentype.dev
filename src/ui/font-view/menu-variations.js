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
            padding: 0.5rem 0 1.5rem 0;
            display: grid;
            grid-template-columns: repeat(8, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <div
            className={css`
              grid-column: 4 / span 5;
              display: grid;
              grid-template-columns: repeat(5, minmax(0, 1fr));
              grid-gap: 1.5rem;
            `}
          >
            {Object.keys(variationAxes).map((key) => (
              <div
                key={key}
                className={css`
                  display: block;
                `}
              >
                <Slider
                  name={key}
                  label={variationAxes[key].name}
                  min={variationAxes[key].min}
                  max={variationAxes[key].max}
                  step={1}
                  value={values[key]}
                  onChange={onVariationAxisChange}
                />
              </div>
            ))}
          </div>
          {/* {variationsNames.length > 0 && (
            <div
              className={css`
                grid-column: 4 / span 4;
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));
                grid-gap: 1rem;
              `}
            >
              {variationsNames.map((key) => (
                <div key={key}>
                  <Checkbox
                    name={key}
                    label={key}
                    checked={selectedVariation === key}
                    onChange={() => onNamedVariationSelect(key)}
                  />
                </div>
              ))}
            </div>
          )} */}
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontVariations);
