import React from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

const FontView = (props) => (
  <div
    className={css`
      font-family: ${props.familyName};
      font-weight: ${props.weight};
      font-style: ${props.italic ? 'italic' : 'normal'};
      position: relative;
      padding: 1rem 2rem;
      min-height: 60vh;
      display: flex;
      align-items: center;
    `}
  >
    And then I see the disinfectant where it knocks it out in a minute. One
    minute. And is there a way we can do something like that, by injection
    inside or almost a cleaning
  </div>
);

FontView.propTypes = {
  id: propTypes.id,
  familyName: propTypes.string,
  subfamilyName: propTypes.string,
  weight: propTypes.string,
  italic: propTypes.bool,
  availableFeatures: propTypes.any,
  defaultSettings: propTypes.any,
  defaultVariationName: propTypes.any,
  variationAxes: propTypes.any,
  namedVariations: propTypes.any,
};

export default FontView;
