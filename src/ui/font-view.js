import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

const FontView = ({ index, metrics, config, onDelete }) => {
  const onDeleteClick = useCallback(() => {
    onDelete(index);
  }, [index]);

  return (
    <div
      className={css`
        font-family: ${metrics.familyName};
        font-weight: ${metrics.weight};
        font-style: ${metrics.italic ? 'italic' : 'normal'};
        font-size: ${config.fontSize}px;
        line-height: ${config.lineHeight};
        position: relative;
        padding: 1rem 2rem;
        min-height: 52vh;
        display: flex;
        align-items: center;
      `}
    >
      <button
        className={css`
          font-size: 18px;
          position: relative;
        `}
        onClick={onDeleteClick}
      >
        DELETE
      </button>
      And then I see the disinfectant where it knocks it out in a minute. One
      minute. And is there a way we can do something like that, by injection
      inside or almost a cleaning
    </div>
  );
};

FontView.propTypes = {
  id: propTypes.id,
  // familyName: propTypes.string,
  // subfamilyName: propTypes.string,
  // weight: propTypes.string,
  // italic: propTypes.bool,
  // availableFeatures: propTypes.any,
  // defaultSettings: propTypes.any,
  // defaultVariationName: propTypes.any,
  // variationAxes: propTypes.any,
  // namedVariations: propTypes.any,
};

export default FontView;
