import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';

import Button from '../btn';
import ButtonToggle from '../btn-toggle';

import MenuVariations from './menu-variations';
import MenuFeatures from './menu-features';
import MenuScript from './menu-script';
import FontSample from './font-view-sample';
import { otFeatures } from '../../constants';

const FontView = ({
  id,
  config,
  global,
  font,
  scriptSample,
  setFontFeature,
  setFontVariationAxis,
}) => {
  const { availableVariationAxes, availableVariations } = font;

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

  const onToggleScriptPanel = useCallback(() => {
    // onActivated(id);
    setShowPanel(showPanel === 'script' ? null : 'script');
  }, [showPanel]);

  const onTextClick = useCallback(() => {
    // onActivated(id);
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

  const showFeaturesPanel = useMemo(() => showPanel === 'features', [
    showPanel,
  ]);

  const showVariationsPanel = useMemo(() => showPanel === 'variations', [
    showPanel,
  ]);

  const showScriptPanel = useMemo(() => showPanel === 'script', [showPanel]);

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
            grid-column: -2 / span 1;
          `}
        ></div>
        <div
          className={css`
            grid-column: 1 / span 8;
          `}
        >
          <MenuScript id={`${id}-menu-script`} visible={showScriptPanel} />
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

      <FontSample
        font={font}
        config={config}
        global={global}
        scriptSample={scriptSample}
      />
    </section>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
