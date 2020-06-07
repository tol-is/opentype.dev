import React, { useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import produce from 'immer';

import { css } from 'emotion';
import { otFeatures } from '../constants';

const FontView = ({ id, index, metrics, config, setConfig, onRemove }) => {
  //
  const onRemoveClick = useCallback(() => {
    onRemove(id);
  }, []);

  //
  const featureKeys = useMemo(() => Object.keys(config.features), []);

  //
  const onFontFeatureChange = useCallback(
    (e) => {
      const nextConfig = produce(config, (draft) => {
        draft.features[e.target.value] = e.target.checked;
      });

      setConfig(id, nextConfig);
    },
    [config]
  );

  //
  const fontFeatureSettings = useMemo(() => {
    let loop = 0;
    return featureKeys.reduce((fRes, fKey) => {
      loop++;
      fRes += `"${fKey}" ${config.features[fKey] ? 1 : 0}`;
      if (loop < featureKeys.length) {
        fRes += ', ';
      }
      return fRes;
    }, '');
  }, [config.features]);

  //
  return (
    <div
      className={css`
        position: relative;
        padding: 1rem 2rem;
        min-height: 52vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          grid-gap: 1em;
        `}
      >
        <div
          className={css`
            grid-column: span 1;
          `}
        >
          <button
            className={css`
              font-size: 18px;
              position: relative;
            `}
            onClick={onRemoveClick}
          >
            REMOVE
          </button>
        </div>

        <div
          className={css`
            grid-column: span 1;
            display: flex;
            flex-direction: column;
          `}
        >
          <label htmlFor={`${id}_inputFontSize`}>Font Size</label>
          <input
            id={`${id}_inputFontSize`}
            type="range"
            min={8}
            max={400}
            step={1}
          />
        </div>
        <div
          className={css`
            grid-column: span 1;
            display: flex;
            flex-direction: column;
          `}
        >
          <label htmlFor={`${id}_inputLetterSpacing`}>Letter Spacing</label>
          <input
            id={`${id}_inputLetterSpacing`}
            type="range"
            min={-2}
            max={2}
            step={0.01}
          />
        </div>
        <div
          className={css`
            grid-column: span 6;
          `}
        >
          <fieldset>
            <legend>Open Type Features</legend>
            <div
              className={css`
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));
                grid-gap: 1em;
                & > * {
                  grid-column: span 1;
                }
              `}
            >
              {featureKeys.map((key) => (
                <label>
                  <input
                    type="checkbox"
                    name="features[]"
                    value={key}
                    onChange={onFontFeatureChange}
                  />
                  {otFeatures[key].title}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div
        className={css`
          font-family: ${metrics.familyName};
          font-weight: ${metrics.weight};
          font-style: ${metrics.italic ? 'italic' : 'normal'};
          font-size: ${config.fontSize}px;
          line-height: ${config.lineHeight};
          font-feature-settings: ${fontFeatureSettings};
        `}
      >
        {config.text}
      </div>
    </div>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default FontView;
