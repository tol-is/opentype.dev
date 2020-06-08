import React, { memo } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import Accordion from '../../ui/accordion';

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
        <fieldset
          className={css`
            padding: 2em 0;
          `}
        >
          {Object.keys(variationAxes).map((k) => (
            <div key={k}>
              <label htmlFor={`${k}_axis`}>{variationAxes[k].name}</label>
              <input
                id={`${k}_axis`}
                type="range"
                name={k}
                min={variationAxes[k].min}
                max={variationAxes[k].max}
                step={1}
                value={values[k]}
                onChange={onVariationAxisChange}
              />
            </div>
          ))}
        </fieldset>

        {variationsNames.map((key) => (
          <button
            key={key}
            onClick={() => onNamedVariationSelect(key)}
            className={css`
              background-color: ${selectedVariation === key
                ? '#cccccc'
                : '#e5e5e5'};
            `}
          >
            {key}
          </button>
        ))}
      </Accordion>
    </>
  );
};

export default memo(FontVariations);
