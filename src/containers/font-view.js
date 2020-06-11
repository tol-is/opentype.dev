import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';
import FontVariations from '../ui/font-view/font-variations';
import FontFeatures from '../ui/font-view/font-features';

import Button from '../ui/btn';
import ButtonToggle from '../ui/btn-toggle';
import Accordion from '../ui/accordion';

import { otFeatures } from '../constants';

const FontView = ({
  id,
  font,
  setFontFeature,
  setFontVariationAxis,
  setNamedVariation,
  testerConfig,
  onRemove,
  onReset,
  onActivated,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [showPanel, setShowPanel] = useState();

  useEffect(() => {
    if (testerConfig.activeFont !== id) {
      setShowPanel(null);
    }
  }, [testerConfig.activeFont]);

  const { metrics, config } = font;

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);
  //
  const onRemoveClick = useCallback(() => {
    onRemove(id);
  }, []);

  const onResetClick = useCallback(() => {
    if (testerConfig.activeFont === id) {
      onReset(id);
      onActivated(null);
    }
  }, [testerConfig.activeFont]);

  //
  const onFontFeatureChange = useCallback((key, enabled) => {
    setFontFeature(id, key, enabled);
  }, []);

  const onVariationAxisChange = useCallback((e) => {
    setFontVariationAxis(id, e.target.name, e.target.value);
  }, []);

  const onNamedVariationSelect = useCallback((key) => {
    setNamedVariation(id, key);
  }, []);

  const onToggleFeaturesPanel = useCallback(() => {
    onActivated(id);
    setShowPanel(showPanel === 'features' ? null : 'features');
  }, [showPanel]);

  const onToggleVariationsPanel = useCallback(() => {
    onActivated(id);
    setShowPanel(showPanel === 'variations' ? null : 'variations');
  }, [showPanel]);

  //
  const featureKeys = useMemo(() => Object.keys(config.features), []);
  const variationAxesKeys = useMemo(
    () => Object.keys(config.variations || {}),
    []
  );
  const variationsNames = useMemo(
    () => Object.keys(metrics.namedVariations || {}),
    []
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
  const fontVariationSettings = useMemo(() => {
    let loop = 0;
    return variationAxesKeys.reduce((vRes, vKey) => {
      loop++;
      vRes += `"${vKey}" ${config.variations[vKey]}`;
      if (loop < variationAxesKeys.length) {
        vRes += ', ';
      }
      return vRes;
    }, '');
  }, [config.variations]);

  //
  const selectedVariation = useMemo(() => {
    return (
      variationsNames.find((vName) => {
        let isSelected = true;
        variationAxesKeys.forEach((vAxis) => {
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

  const showFeaturesPanel = useMemo(() => showPanel === 'features', [
    showPanel,
  ]);

  const showVariationsPanel = useMemo(() => showPanel === 'variations', [
    showPanel,
  ]);

  //
  return (
    <section onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <motion.div
        initial="collapsed"
        animate={isHover || showPanel ? 'open' : 'collapsed'}
        exit="collapsed"
        variants={{
          open: { opacity: 1 },
          collapsed: { opacity: 0 },
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 100 }}
        className={css`
          padding-top: 24px;
          display: grid;
          grid-gap: 24px;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          width: 100%;
        `}
      >
        <div>
          <ButtonToggle
            selected={showFeaturesPanel}
            aria-expanded={showFeaturesPanel}
            aria-controls={`${id}-font-features`}
            onClick={onToggleFeaturesPanel}
            label={'Font Features'}
          />
        </div>
        {metrics.isVariable && (
          <div>
            <ButtonToggle
              selected={showVariationsPanel}
              aria-expanded={showVariationsPanel}
              aria-controls={`${id}-font-variations`}
              onClick={onToggleVariationsPanel}
              label={'Font Variations'}
            />
          </div>
        )}
        <div
          className={css`
            grid-column-start: -3;
            grid-column-span: 1;
          `}
        >
          <Button onClick={onResetClick} label="Reset" />
        </div>
        <div
          className={css`
            grid-column-start: -2;
            grid-column-span: 1;
          `}
        >
          <Button onClick={onRemoveClick} label="Delete" />
        </div>
      </motion.div>
      <FontVariations
        id={`${id}-font-variations`}
        visible={showVariationsPanel}
        values={config.variations}
        selectedVariation={selectedVariation}
        variationAxesKeys={variationAxesKeys}
        variationAxes={metrics.variationAxes}
        variationsNames={variationsNames}
        onVariationAxisChange={onVariationAxisChange}
        onNamedVariationSelect={onNamedVariationSelect}
      />
      <FontFeatures
        id={`${id}-font-features`}
        visible={showFeaturesPanel}
        fontFeatures={config.features}
        onFontFeatureChange={onFontFeatureChange}
      />
      <div
        className={css`
          padding: 48px 0;
          font-family: ${metrics.familyName};
          font-weight: ${metrics.weight};
          font-style: ${metrics.italic ? 'italic' : 'normal'};
          font-size: ${testerConfig.fontSize}px;
          line-height: ${testerConfig.lineHeight};
          font-feature-settings: ${fontFeatureSettings};
          font-variation-settings: ${fontVariationSettings};
          direction: ${testerConfig.direction};
        `}
      >
        {testerConfig.text}
      </div>
    </section>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
