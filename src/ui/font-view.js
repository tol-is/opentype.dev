import React, { useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import produce from 'immer';
import { motion, AnimatePresence } from 'framer-motion';

import { css } from 'emotion';
import { otFeatures } from '../constants';

const FontView = ({ id, index, metrics, config, setConfig, onRemove }) => {
  console.log(config, metrics);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showVariations, setShowVariations] = useState(false);

  //
  const onRemoveClick = useCallback(() => {
    onRemove(id);
  }, []);

  //
  const featureKeys = useMemo(() => Object.keys(config.features), []);
  const variationKeys = useMemo(() => Object.keys(config.variations || {}), []);

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

  const onVariationChange = useCallback(
    (e) => {
      const nextConfig = produce(config, (draft) => {
        draft.variations[e.target.name] = e.target.value;
      });
      setConfig(id, nextConfig);
    },
    [config]
  );

  const onLetterSpacingChange = useCallback((e) => {
    const nextConfig = produce(config, (draft) => {
      draft.letterSpacing = e.target.value;
    });
    setConfig(id, nextConfig);
  });

  const onFontSizeChange = useCallback((e) => {
    const nextConfig = produce(config, (draft) => {
      draft.fontSize = e.target.value;
    });

    setConfig(id, nextConfig);
  });

  const onLineHeightChange = useCallback((e) => {
    const nextConfig = produce(config, (draft) => {
      draft.lineHeight = e.target.value;
    });
    setConfig(id, nextConfig);
  });

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
    return variationKeys.reduce((vRes, vKey) => {
      loop++;
      vRes += `"${vKey}" ${config.variations[vKey]}`;
      if (loop < variationKeys.length) {
        vRes += ', ';
      }
      return vRes;
    }, '');
  }, [config.variations]);

  //

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
          grid-template-columns: repeat(10, minmax(0, 1fr));
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
            value={config.fontSize}
            onChange={onFontSizeChange}
          />
        </div>
        <div
          className={css`
            grid-column: span 1;
            display: flex;
            flex-direction: column;
          `}
        >
          <label htmlFor={`${id}_inputLineHeight`}>Line Height</label>
          <input
            id={`${id}_inputLineHeight`}
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={config.lineHeight}
            onChange={onLineHeightChange}
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
            min={-0.2}
            max={0.2}
            step={0.001}
            value={config.letterSpacing}
            onChange={onLetterSpacingChange}
          />
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
        {config.variations && (
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
            grid-column: span 10;
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
                    <div>
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
                        onChange={onVariationChange}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </Accordion>
        </div>
        <div
          className={css`
            grid-column: span 10;
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
                  <label>
                    <input
                      type="checkbox"
                      name="features[]"
                      value={key}
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
        contentEditable
        className={css`
          font-family: ${metrics.familyName};
          font-weight: ${metrics.weight};
          font-style: ${metrics.italic ? 'italic' : 'normal'};
          font-size: ${config.fontSize}px;
          line-height: ${config.lineHeight};
          letter-spacing: ${config.letterSpacing}em;
          font-feature-settings: ${fontFeatureSettings};
          font-variation-settings: ${fontVariationSettings};
          padding: 2rem 0;
        `}
      >
        {config.text}
      </div>
    </div>
  );
};

const Accordion = ({ visible, children }) => {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className={css`
            overflow: hidden;
          `}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 1, height: 0 },
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 100 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default FontView;
