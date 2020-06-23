import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';

import { otFeatures } from '../constants';

import FontView from '../ui/font-view';
import {
  setActiveFont,
  setTopFont,
  setFontProp,
  setFontSample,
  setFontFeature,
  setFontVariationAxis,
} from '../modules/tester';

const FontItemContainer = ({
  id,
  index,
  font,
  config,
  global,
  adhesion,
  direction,
  scriptSample,
  setTopFont,
  setFontProp,
  setActiveFont,
  setFontSample,
  setFontFeature,
  setFontVariationAxis,
}) => {
  //
  return (
    <FontView
      id={id}
      index={index}
      font={font}
      config={config}
      global={global}
      adhesion={adhesion}
      direction={direction}
      scriptSample={scriptSample}
      setActiveFont={setActiveFont}
      setTopFont={setTopFont}
      setFontProp={setFontProp}
      setFontSample={setFontSample}
      setFontFeature={setFontFeature}
      setFontVariationAxis={setFontVariationAxis}
    />
  );
};

function mapStateToProps(state, ownProps) {
  // font from library
  const config = state.tester.fonts.find((f) => f.id === ownProps.id);

  const font = state.library.fonts[config.font_id].metrics;

  // config from tester

  const scriptSample = state.adhesion[config.script].samples.find((s) => {
    return config.sample === 'default'
      ? s.default === true
      : s.key === config.sample;
  });

  return {
    font,
    config,
    adhesion: state.adhesion,
    direction: state.adhesion[config.script].direction,
    scriptSample,
    global: state.tester.global,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTopFont: (value) => dispatch(setTopFont(value)),
    setActiveFont: (value) => dispatch(setActiveFont(value)),
    setFontProp: (id, key, value) => dispatch(setFontProp(id, key, value)),
    setFontFeature: (id, key, enabled) =>
      dispatch(setFontFeature(id, key, enabled)),
    setFontVariationAxis: (id, axis, value) =>
      dispatch(setFontVariationAxis(id, axis, value)),
    setFontSample: (id, script, sample) =>
      dispatch(setFontSample(id, script, sample)),
    // setFontNamedVariation: (id, name) =>
    //   dispatch(setFontNamedVariation(id, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FontItemContainer);
