import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { css } from 'emotion';

import FontVariations from '../ui/font-view/font-variations';
import FontFeatures from '../ui/font-view/font-features';

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
  const [showPanel, setShowPanel] = useState();

  const { metrics, config } = font;

  //
  const onRemoveClick = useCallback(() => {
    onRemove(id);
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
    setShowPanel(showPanel === 'features' ? null : 'features');
  }, [showPanel]);

  const onToggleVariationsPanel = useCallback(() => {
    setShowPanel(showPanel === 'variations' ? null : 'variations');
  }, [showPanel]);

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

  //
  return (
    <>
      <button onClick={onRemoveClick}>Remove Font</button>{' '}
      <button
        aria-expanded={showPanel === 'features'}
        aria-controls={`${id}-font-features`}
        onClick={onToggleFeaturesPanel}
      >
        Font Features
      </button>{' '}
      {metrics.isVariable && (
        <button
          aria-expanded={showPanel === 'variations'}
          aria-controls={`${id}-font-variations`}
          onClick={onToggleVariationsPanel}
        >
          Font Variations
        </button>
      )}
      <FontVariations
        id={`${id}-font-variations`}
        visible={showPanel === 'variations'}
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
        visible={showPanel === 'features'}
        fontFeatures={config.features}
        onFontFeatureChange={onFontFeatureChange}
      />
      <div
        className={css`
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
    </>
  );
};

FontView.propTypes = {
  id: propTypes.string,
};

export default memo(FontView);
