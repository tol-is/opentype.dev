import React, { memo } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import Accordion from '../accordion';
import Slider from '../input-range';
import Radio from '../input-radio';

const FontText = ({
  visible,
  adhesion,
  selectedScript,
  selectedSample,
  onChange,
  ...rest
}) => {
  const onSampleToggleChange = (key, checked) => {
    if (checked) {
      onChange(selectedScript, key);
    }
  };
  //
  return (
    <>
      <Accordion visible={visible} {...rest}>
        <div
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding: 1.5rem 0;
            display: grid;
            grid-template-columns: repeat(8, minmax(0, 1fr));
            grid-gap: 1.5rem;
            width: 100%;
          `}
        >
          <div
            className={css`
              grid-column: 1 / span 4;
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              grid-column-gap: 1.5rem;
              grid-row-gap: 1rem;
            `}
          >
            {adhesion[selectedScript].samples.map((sample) => (
              <div
                key={sample.key}
                className={css`
                  display: block;
                `}
              >
                <Radio
                  id={sample.key}
                  name={`${sample.selectedScript}-sample`}
                  label={sample.name}
                  checked={
                    sample.key === selectedSample ||
                    (selectedSample === 'default' && sample.default === true)
                  }
                  onChange={onSampleToggleChange}
                />
              </div>
            ))}
          </div>
        </div>
      </Accordion>
    </>
  );
};

export default memo(FontText);
