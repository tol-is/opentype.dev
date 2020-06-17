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
  config,
  global,
  font,
  setFontFeature,
  setFontVariationAxis,
}) => {
  const {
    availableFeatures,
    availableVariationAxes,
    availableVariations,
  } = font;

  const [willDelete, setWillDelete] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [showPanel, setShowPanel] = useState();

  // useEffect(() => {
  //   if (testerConfig.activeFont !== id) {
  //     setShowPanel(null);
  //   }
  // }, [testerConfig.activeFont]);

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
    //   onReset(id);
    //   if (testerConfig.activeFont === id) {
    //     onActivated(null);
    // }
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

  const onNamedVariationSelect = useCallback((key) => {
    // setNamedVariation(id, key);
  }, []);

  const onToggleFeaturesPanel = useCallback(() => {
    // onActivated(id);
    setShowPanel(showPanel === 'features' ? null : 'features');
  }, [showPanel]);

  const onToggleVariationsPanel = useCallback(() => {
    // onActivated(id);
    setShowPanel(showPanel === 'variations' ? null : 'variations');
  }, [showPanel]);

  const onToggleTextPanel = useCallback(() => {
    // onActivated(id);
    setShowPanel(showPanel === 'text' ? null : 'text');
  }, [showPanel]);

  const onTextClick = useCallback(() => {
    // onActivated(id);
  }, []);
  //
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

  const showFeaturesPanel = useMemo(() => showPanel === 'features', [
    showPanel,
  ]);

  const showVariationsPanel = useMemo(() => showPanel === 'variations', [
    showPanel,
  ]);

  const showTextPanel = useMemo(() => showPanel === 'text', [showPanel]);

  //
  return (
    <section>
      <motion.div
        initial="hidden"
        animate={isHover || showPanel ? 'visible' : 'hidden'}
        exit="hidden"
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 1 },
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

        {font.availableFeatures.length > 0 && (
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
        {font.isVariable && (
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
            grid-column-start: -2;
            grid-column-span: 1;
          `}
        >
          <FontHeading>{font.postscriptName}</FontHeading>
        </div>
      </motion.div>
      <FontText id={`${id}-font-text-sample`} visible={showTextPanel} />
      {font.availableFeatures.length > 0 && (
        <FontFeatures
          id={`${id}-font-features`}
          visible={showFeaturesPanel}
          features={config.features}
          onFontFeatureChange={onFontFeatureChange}
        />
      )}
      {font.isVariable && (
        <FontVariations
          id={`${id}-font-variations`}
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
      <div
        className={css`
          padding: 1.5rem 0 0.5rem 0;
          white-space: pre-wrap;
          font-family: ${font.familyName};
          font-weight: ${font.weight};
          font-style: ${font.italic ? 'italic' : 'normal'};
          font-size: ${global.fontSize}px;
          line-height: ${global.lineHeight};
          font-feature-settings: ${fontFeatureSettings};
          font-variation-settings: ${fontVariationSettings};
          direction: ${global.rtl ? 'rtl' : 'ltr'};
          transition: font-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        `}
      >
        {global.text}
      </div>
    </section>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
