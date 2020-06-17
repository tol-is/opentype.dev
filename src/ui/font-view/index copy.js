import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';

import Button from '../btn';
import ButtonToggle from '../btn-toggle';

import FontVariations from './font-variations';
import FontFeatures from './font-features';
import FontText from './font-text';
import FontHeading from './font-heading';
import { otFeatures } from '../../constants';

const FontView = ({
  id,
  index,
  font,
  setFontFeature,
  setFontVariationAxis,
  setNamedVariation,
  testerConfig,
  onRemove,
  onReset,
  onActivated,
}) => {
  const [willDelete, setWillDelete] = useState(false);
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
    setWillDelete(true);
  }, [willDelete]);

  const onAnimationComplete = useCallback(() => {
    if (willDelete) {
      onRemove(id);
    }
  }, [willDelete]);

  const onResetClick = useCallback(() => {
    onReset(id);
    if (testerConfig.activeFont === id) {
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

  const onToggleTextPanel = useCallback(() => {
    onActivated(id);
    setShowPanel(showPanel === 'text' ? null : 'text');
  }, [showPanel]);

  const onTextClick = useCallback(() => {
    onActivated(id);
  }, []);

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

  const showTextPanel = useMemo(() => showPanel === 'text', [showPanel]);

  //
  return (
    <section
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      className={css``}
    >
      <motion.div
        style={{
          overflow: 'hidden',
        }}
        initial="closed"
        animate={!willDelete ? 'open' : 'closed'}
        onAnimationComplete={onAnimationComplete}
        exit="closed"
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 80,
          delay: index * 0.06,
        }}
      >
        <motion.div
          initial="hidden"
          animate={isHover || showPanel ? 'visible' : 'hidden'}
          exit="hidden"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 100 }}
          className={css`
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            padding-top: 3rem;
            display: grid;
            grid-gap: 1.5rem;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            width: 100%;
          `}
        >
          <FontHeading>{metrics.postscriptName}</FontHeading>

          <div>
            <ButtonToggle
              selected={showTextPanel}
              aria-expanded={showTextPanel}
              aria-controls={`${id}-font-text-sample`}
              onClick={onToggleTextPanel}
              line="top"
              label={'Text'}
            />
          </div>

          {featureKeys.length > 0 && (
            <div>
              <ButtonToggle
                selected={showFeaturesPanel}
                aria-expanded={showFeaturesPanel}
                aria-controls={`${id}-font-features`}
                onClick={onToggleFeaturesPanel}
                line="top"
                label={'Features'}
              />
            </div>
          )}
          {metrics.isVariable && (
            <div>
              <ButtonToggle
                selected={showVariationsPanel}
                aria-expanded={showVariationsPanel}
                aria-controls={`${id}-font-variations`}
                onClick={onToggleVariationsPanel}
                line="top"
                label={'Variations'}
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
        <FontText id={`${id}-font-text-sample`} visible={showTextPanel} />
        {featureKeys.length > 0 && (
          <FontFeatures
            id={`${id}-font-features`}
            visible={showFeaturesPanel}
            fontFeatures={config.features}
            onFontFeatureChange={onFontFeatureChange}
          />
        )}
        {metrics.isVariable && (
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
        )}
        <div
          onClick={onTextClick}
          className={css`
            padding: 1.5rem 0 0.5rem 0;
            white-space: pre-wrap;
            font-family: ${metrics.familyName};
            font-weight: ${metrics.weight};
            font-style: ${metrics.italic ? 'italic' : 'normal'};
            font-size: ${testerConfig.fontSize}px;
            line-height: ${testerConfig.lineHeight};
            font-feature-settings: ${fontFeatureSettings};
            font-variation-settings: ${fontVariationSettings};
            direction: ${testerConfig.rtl ? 'rtl' : 'ltr'};
            transition: font-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          `}
        >
          {testerConfig.text}
        </div>
      </motion.div>
    </section>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
