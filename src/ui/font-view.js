import React, { useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { useInView } from 'react-intersection-observer';

const FontView = ({ id, index, metrics, config, onDelete }) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    console.log(inView);
  }, [inView]);

  const onDeleteClick = useCallback(() => {
    onDelete(index);
  }, [index]);

  return (
    <div
      ref={ref}
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
      <button
        className={css`
          font-size: 18px;
          position: relative;
        `}
        onClick={onDeleteClick}
      >
        DELETE
      </button>
      {config.text}
    </div>
  );
};

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
