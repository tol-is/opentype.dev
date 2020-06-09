import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

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
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showPanel, setShowPanel] = useState();

  const { metrics, config } = font;

  const onActivate = useCallback(() => {
    setIsActive(true);
  }, []);

  const onDeactivate = useCallback(() => {
    setIsActive(false);
  }, []);
  //
  const onRemoveClick = useCallback(() => {
    onRemove(id);
  }, []);

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
    setShowPanel(showPanel === 'features' ? null : 'features');
  }, [showPanel]);

  const onToggleVariationsPanel = useCallback(() => {
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

  const showFeaturesPanel = useMemo(
    () => isActive && showPanel === 'features',
    [isActive, showPanel]
  );

  const showVariationsPanel = useMemo(
    () => isActive && showPanel === 'variations',
    [isActive, showPanel]
  );

  //
  return (
    <div onMouseEnter={onActivate} onMouseLeave={onDeactivate}>
      <div
        className={css`
          opacity: ${isActive ? 1 : 1};
          padding-top: 24px;
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          width: 100%;
          & > * {
            grid-column: span 1;
          }
        `}
      >
        <ButtonToggle
          selected={showFeaturesPanel}
          aria-expanded={showFeaturesPanel}
          aria-controls={`${id}-font-features`}
          onClick={onToggleFeaturesPanel}
          label={'Font Features'}
        />
        {metrics.isVariable && (
          <ButtonToggle
            selected={showVariationsPanel}
            aria-expanded={showVariationsPanel}
            aria-controls={`${id}-font-variations`}
            onClick={onToggleVariationsPanel}
            label={'Font Variations'}
          />
        )}
        <div
          className={css`
            grid-column-start: -2;
            grid-column-span: 1;
          `}
        >
          <Button onClick={onRemoveClick} label="Delete" />
        </div>
      </div>
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
    </div>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
