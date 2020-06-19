import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';

import { otFeatures } from '../constants';

import FontView from '../ui/font-view';
import { setFontFeature, setFontVariationAxis } from '../modules/tester';

const FontItemContainer = ({
  id,
  index,
  font,
  config,
  global,
  scriptSample,
  setFontFeature,
  setFontVariationAxis,
}) => {
  //
  return (
    <div>
      <FontView
        id={id}
        index={index}
        font={font}
        config={config}
        global={global}
        scriptSample={scriptSample}
        setFontFeature={setFontFeature}
        setFontVariationAxis={setFontVariationAxis}
      />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  // font from library
  const font = state.library.fonts[ownProps.id].metrics;

  // config from tester
  const config = state.tester.fonts.find((f) => f.id === ownProps.id);

  const adhesion = state.adhesion[config.script];

  const scriptSample = adhesion.samples.find((s) => {
    return config.sample === 'default'
      ? s.default === true
      : s.key === config.sample;
  });

  return {
    font,
    config,
    scriptSample,
    global: state.tester.global,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // setActiveFont: (value) => dispatch(setActiveFont(value)),
    // setFontConfigProp: (id, key, value) =>
    //   dispatch(setFontConfigProp(id, key, value)),
    setFontFeature: (id, key, enabled) =>
      dispatch(setFontFeature(id, key, enabled)),
    setFontVariationAxis: (id, axis, value) =>
      dispatch(setFontVariationAxis(id, axis, value)),
    // setFontNamedVariation: (id, name) =>
    //   dispatch(setFontNamedVariation(id, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FontItemContainer);
