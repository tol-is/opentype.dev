import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { css } from 'emotion';
import { motion } from 'framer-motion';

import { otFeatures } from '../constants';

import FontView from '../ui/font-view';
import {
  tester,
  setFontFeature,
  setFontVariationAxis,
} from '../modules/tester';

const FontItemContainer = ({
  id,
  index,
  config,
  font,
  global,
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
        setFontFeature={setFontFeature}
        setFontVariationAxis={setFontVariationAxis}
      />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const config = state.tester.fonts.find((f) => f.id === ownProps.id);
  const font = state.library.fonts[ownProps.id].metrics;

  return {
    config,
    font,
    global: state.tester.global,
    openPanel: state.tester.openPanel,
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
