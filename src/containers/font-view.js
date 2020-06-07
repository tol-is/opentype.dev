import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import produce from 'immer';
import { css } from 'emotion';
import { motion, AnimatePresence } from 'framer-motion';

import Accordion from '../ui/accordion';

import { otFeatures } from '../constants';

const FontView = ({
  id,
  font,
  setFontFeature,
  setFontVariationAxis,
  setNamedVariation,
  globalConfig,
  onRemove,
}) => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showVariations, setShowVariations] = useState(false);

  const { metrics, config } = font;

  //
  const onRemoveClick = useCallback(() => {
    onRemove(id);
  }, []);

  //
  const featureKeys = useMemo(() => Object.keys(config.features), []);
  const variationAxes = useMemo(() => Object.keys(config.variations || {}), []);
  const variationsNames = useMemo(
    () => Object.keys(metrics.namedVariations || {}),
    []
  );

  //
  const onFontFeatureChange = useCallback((e) => {
    setFontFeature(id, e.target.name, e.target.checked);
  }, []);

  const onVariationAxisChange = useCallback((e) => {
    setFontVariationAxis(id, e.target.name, e.target.value);
  }, []);

  const onNamedVariationSelect = useCallback((key) => {
    setNamedVariation(id, key);
  }, []);

  const onToggleFeaturesPanel = useCallback(() => {
    setShowFeatures(!showFeatures);
  }, [showFeatures]);

  const onToggleVariationsPanel = useCallback(() => {
    setShowVariations(!showVariations);
  }, [showVariations]);

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
  const fontVariationSettings = useMemo(() => {
    let loop = 0;
    return variationAxes.reduce((vRes, vKey) => {
      loop++;
      vRes += `"${vKey}" ${config.variations[vKey]}`;
      if (loop < variationAxes.length) {
        vRes += ', ';
      }
      return vRes;
    }, '');
  }, [config.variations]);

  const selectedVariation = useMemo(() => {
    return (
      variationsNames.find((vName) => {
        let isSelected = true;
        variationAxes.forEach((vAxis) => {
          if (
            parseInt(config.variations[vAxis]) !==
            parseInt(metrics.namedVariations[vName][vAxis])
          ) {
            isSelected = false;
          }
        });

        return isSelected;
      }) || 'Custom'
    );
  }, [config.variations]);

  //

  //
  return (
    <div
      className={css`
        position: relative;
        padding: 1rem 2rem;
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
          <label>
            <input
              type="checkbox"
              name="showFeatures"
              checked={showFeatures}
              onChange={onToggleFeaturesPanel}
            />
            Toggle Features
          </label>
        </div>
        {metrics.isVariable && (
          <div
            className={css`
              grid-column: span 1;
              display: flex;
              flex-direction: column;
            `}
          >
            <label>
              <input
                type="checkbox"
                name="showVariations"
                checked={showVariations}
                onChange={onToggleVariationsPanel}
              />
              Toggle Variations
            </label>
          </div>
        )}
        <div
          className={css`
            grid-column: span 7;
          `}
        >
          <Accordion visible={showVariations}>
            <div>
              <fieldset>
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
                  {Object.keys(metrics.variationAxes).map((k) => (
                    <div key={k}>
                      <label htmlFor={`${k}_axis`}>
                        {metrics.variationAxes[k].name}
                      </label>
                      <br />
                      <input
                        id={`${k}_axis`}
                        type="range"
                        name={k}
                        min={metrics.variationAxes[k].min}
                        max={metrics.variationAxes[k].max}
                        step={1}
                        value={config.variations[k]}
                        onChange={onVariationAxisChange}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
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
                {variationsNames.map((key) => (
                  <button
                    key={key}
                    onClick={() => onNamedVariationSelect(key)}
                    className={css`
                      color: ${selectedVariation === key ? '#ffffff' : '#000'};
                      background-color: ${selectedVariation === key
                        ? '#0012ff'
                        : '#e5e5e5'};
                    `}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
        <div
          className={css`
            grid-column: span 5;
          `}
        >
          <Accordion visible={showFeatures}>
            <fieldset
              className={css`
                padding: 2rem 0;
              `}
            >
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
                  <label key={key}>
                    <input
                      type="checkbox"
                      name={key}
                      checked={config.features[key]}
                      onChange={onFontFeatureChange}
                    />
                    {otFeatures[key].title}
                  </label>
                ))}
              </div>
            </fieldset>
          </Accordion>
        </div>
      </div>
      <div
        className={css`
          font-family: ${metrics.familyName};
          font-weight: ${metrics.weight};
          font-style: ${metrics.italic ? 'italic' : 'normal'};
          font-size: ${globalConfig.fontSize}px;
          line-height: ${globalConfig.lineHeight};
          font-feature-settings: ${fontFeatureSettings};
          font-variation-settings: ${fontVariationSettings};
          direction: ${globalConfig.direction};
        `}
      >
        {globalConfig.text}
      </div>
    </div>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
