import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import useViewportSize from '../../hooks/use-viewport-size';

import ButtonToggle from '../btn-toggle';
import Slider from '../input-range';

import MenuVariations from './menu-variations';
import MenuFeatures from './menu-features';
import MenuScript from './menu-script';

const FontView = ({
  id,
  font,
  config,
  global,
  adhesion,
  direction,
  scriptSample,
  setTopFont,
  setActiveFont,
  setFontProp,
  setFontSample,
  setFontFeature,
  setFontVariationAxis,
}) => {
  const {
    availableFeatures,
    availableVariationAxes,
    availableVariations,
  } = font;

  const { height } = useViewportSize();
  const [willDelete, setWillDelete] = useState(false);
  const [showPanel, setShowPanel] = useState();

  const [ref, inView, entry] = useInView({
    threshold: 1,
    rootMargin: `0px 0px -${height - 80}px 0px`,
  });

  useEffect(() => {
    console.log(entry);
  }, [entry]);

  useEffect(() => {
    if (inView) {
      setTopFont(id);
    }
  }, [inView]);

  useEffect(() => {
    if (global.activeFont !== id) {
      setShowPanel(null);
    }
  }, [global.activeFont]);

  //
  const onRemoveClick = useCallback(() => {
    setWillDelete(true);
  }, [willDelete]);

  const onAnimationComplete = useCallback(() => {
    if (willDelete) {
      onRemove(id);
    }
  }, [willDelete]);

  const onResetClick = useCallback(() => {
    //   onReset(id);
    //   if (testerConfig.activeFont === id) {
    //     onActivated(null);
    // }
  }, []);

  const onFontSizeChange = useCallback((e) => {
    setActiveFont(id);
    setFontProp(id, 'fontSize', e.target.value);
  }, []);

  const onLineHeightChange = useCallback((e) => {
    setActiveFont(id);
    setFontProp(id, 'lineHeight', e.target.value);
  }, []);
  //
  const onFontFeatureChange = useCallback((key, enabled) => {
    setFontFeature(id, key, enabled);
  }, []);

  const onVariationAxisChange = useCallback(
    (e) => {
      setFontVariationAxis(id, e.target.name, e.target.value);
    },
    [id]
  );

  const onSampleChange = useCallback(
    (script, sample) => {
      setFontSample(id, script, sample);
    },
    [id]
  );

  const onNamedVariationSelect = useCallback((key) => {
    // setNamedVariation(id, key);
  }, []);

  const onToggleFeaturesPanel = useCallback(() => {
    setActiveFont(id);
    setShowPanel(showPanel === 'features' ? null : 'features');
  }, [showPanel]);

  const onToggleVariationsPanel = useCallback(() => {
    setActiveFont(id);
    setShowPanel(showPanel === 'variations' ? null : 'variations');
  }, [showPanel]);

  const onToggleScriptPanel = useCallback(() => {
    setActiveFont(id);
    setShowPanel(showPanel === 'script' ? null : 'script');
  }, [showPanel]);

  const onTextFocus = useCallback(() => {
    setActiveFont(id);
    setShowPanel(null);
  }, []);

  const onTextBlur = useCallback(() => {
    setActiveFont(null);
    setShowPanel(null);
  }, []);

  //
  const selectedVariation = useMemo(() => {
    return (
      availableVariations.find((vName) => {
        let isSelected = true;
        availableVariationAxes.forEach((vAxis) => {
          if (
            parseInt(config.variations[vAxis]) !==
            parseInt(font.variationsNamed[vName][vAxis])
          ) {
            isSelected = false;
          }
        });

        return isSelected;
      }) || 'Custom'
    );
  }, [config.variations]);

  const fontFeatureSettings = useMemo(() => {
    let loop = 0;
    return availableFeatures.reduce((fRes, fKey) => {
      loop++;
      fRes += `"${fKey}" ${config.features[fKey] ? 1 : 0}`;
      if (loop < availableFeatures.length) {
        fRes += ', ';
      }
      return fRes;
    }, '');
  }, [config.features]);

  //
  const fontVariationSettings = useMemo(() => {
    let loop = 0;
    return availableVariationAxes.reduce((vRes, vKey) => {
      loop++;
      vRes += `"${vKey}" ${config.variations[vKey]}`;
      if (loop < availableVariationAxes.length) {
        vRes += ', ';
      }
      return vRes;
    }, '');
  }, [config.variations]);

  const showFeaturesPanel = useMemo(() => showPanel === 'features', [
    showPanel,
  ]);

  const showVariationsPanel = useMemo(() => showPanel === 'variations', [
    showPanel,
  ]);

  const showScriptPanel = useMemo(() => showPanel === 'script', [showPanel]);

  const isActiveFont = useMemo(() => global.activeFont === id, [
    global.activeFont,
  ]);

  const isFocusModeEnabled = useMemo(() => global.focus, [global.focus]);

  //
  return (
    <section
      className={css`
        padding: 0 0 0 0;
      `}
    >
      <motion.div
        ref={ref}
        initial="visible"
        animate={isFocusModeEnabled ? 'hidden' : 'visible'}
        variants={{
          visible: {
            opacity: 1,
            height: 'auto',
            display: 'grid',
          },
          hidden: {
            opacity: 0,
            height: 0,
            transitionEnd: {
              display: 'none',
            },
          },
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 100 }}
        className={css`
          position: sticky;
          z-index: 4;
          background-color: #060606;
          top: 0;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          display: grid;
          grid-column-gap: 1.5rem;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          width: 100%;
        `}
      >
        <div
          className={css`
            padding: 1em 0;
            text-align: left;
            font-weight: 400;
            line-height: 1;
            color: #fff;
          `}
        >
          {font.postscriptName}
        </div>
        <div>
          <ButtonToggle
            selected={showScriptPanel}
            aria-expanded={showScriptPanel}
            aria-controls={`${id}-font-text-sample`}
            onClick={onToggleScriptPanel}
            label={'Script'}
          />
        </div>

        {font.availableFeatures.length > 0 && (
          <div>
            <ButtonToggle
              selected={showFeaturesPanel}
              aria-expanded={showFeaturesPanel}
              aria-controls={`${id}-font-features`}
              onClick={onToggleFeaturesPanel}
              label={'Features'}
            />
          </div>
        )}
        {font.isVariable && (
          <div>
            <ButtonToggle
              selected={showVariationsPanel}
              aria-expanded={showVariationsPanel}
              aria-controls={`${id}-font-variations`}
              onClick={onToggleVariationsPanel}
              label={'Variations'}
            />
          </div>
        )}

        <div
          className={css`
            grid-column: 5 / span 1;
          `}
        >
          <Slider
            label="Font Size"
            min={6}
            max={128}
            step={1}
            value={config.fontSize}
            onChange={onFontSizeChange}
          />
        </div>
        <div>
          <Slider
            label="Line Height"
            min={1}
            max={2}
            step={0.01}
            value={config.lineHeight}
            onChange={onLineHeightChange}
          />
        </div>

        <div
          className={css`
            grid-column: 1 / span 8;
          `}
        >
          <MenuScript
            id={`${id}-menu-script`}
            visible={showScriptPanel}
            selectedScript={config.script}
            selectedSample={config.sample}
            adhesion={adhesion}
            onChange={onSampleChange}
          />
          {font.availableFeatures.length > 0 && (
            <MenuFeatures
              id={`${id}-menu-features`}
              visible={showFeaturesPanel}
              features={config.features}
              onFontFeatureChange={onFontFeatureChange}
            />
          )}
          {font.isVariable && (
            <MenuVariations
              id={`${id}-menu-variations`}
              visible={showVariationsPanel}
              values={config.variations}
              selectedVariation={selectedVariation}
              variationAxesKeys={font.availableVariationAxes}
              variationAxes={font.variationAxes}
              variationsNames={font.ava}
              onVariationAxisChange={onVariationAxisChange}
              onNamedVariationSelect={onNamedVariationSelect}
            />
          )}
        </div>
      </motion.div>

      <div
        className={css`
          padding: ${isFocusModeEnabled ? 0 : '1.5rem'} 0 0 0;
          transition: padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        `}
      >
        {scriptSample.layout === 'stack' && (
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onFocus={onTextFocus}
            spellcheck={false}
            className={css`
              padding: 1rem 0;
              &:focus {
                outline: none;
                background-color: rgba(255, 255, 255, 0.05);
              }
            `}
          >
            {scriptSample.strings.map((v, i) => (
              <span
                key={`${id}-sample-${i}`}
                className={css`
                  display: block;
                  white-space: pre-wrap;
                  font-family: ${font.familyName};
                  font-weight: ${font.weight};
                  font-style: ${font.italic ? 'italic' : 'normal'};
                  font-size: ${config.fontSize}px;
                  line-height: ${config.lineHeight};
                  font-feature-settings: ${fontFeatureSettings};
                  font-variation-settings: ${fontVariationSettings};
                  direction: ${direction};
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                `}
              >
                {v}
              </span>
            ))}
          </div>
        )}

        {scriptSample.layout === 'columns' && (
          <div
            className={css`
              display: grid;
              grid-gap: 1.5rem;
              grid-template-columns: repeat(
                ${scriptSample.strings.length},
                1fr
              );
              direction: ${direction};
            `}
          >
            {scriptSample.strings.map((v, i) => (
              <div
                key={`${id}-sample-${i}`}
                contentEditable={true}
                spellcheck={false}
                suppressContentEditableWarning={true}
                onFocus={onTextFocus}
                onBlur={onTextBlur}
                className={css`
                  padding: 1rem 0;
                  flex: 1;
                  white-space: pre-wrap;
                  font-family: ${font.familyName};
                  font-weight: ${font.weight};
                  font-style: ${font.italic ? 'italic' : 'normal'};
                  font-size: ${config.fontSize}px;
                  line-height: ${config.lineHeight};
                  font-feature-settings: ${fontFeatureSettings};
                  font-variation-settings: ${fontVariationSettings};
                  direction: ${direction};
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                  &:focus {
                    outline: none;
                    background-color: rgba(255, 255, 255, 0.05);
                  }
                `}
              >
                {v}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
