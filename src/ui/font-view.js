import React from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

const FontView = ({ metrics, config }) => (
  <div
    className={css`
      font-family: ${metrics.familyName};
      font-weight: ${metrics.weight};
      font-style: ${metrics.italic ? 'italic' : 'normal'};
      font-size: ${config.fontSize}px;
      line-height: ${config.lineHeight};
      position: relative;
      padding: 1rem 2rem;
      min-height: 40vh;
      display: flex;
      align-items: center;
    `}
  >
    {config.text}
  </div>
);

FontView.propTypes = {
  id: propTypes.id,
  metrics: propTypes.objectOf({
    familyName: propTypes.string,
    subfamilyName: propTypes.string,
    weight: propTypes.string,
    italic: propTypes.bool,
    availableFeatures: propTypes.any,
    defaultSettings: propTypes.any,
    defaultVariationName: propTypes.any,
    variationAxes: propTypes.any,
    namedVariations: propTypes.any,
  }),
  config: propTypes.objectOf({
    text: propTypes.string,
    fontSize: propTypes.number,
    lineHeight: propTypes.number,
  }),
};

export default FontView;
