import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FontLoader from './font-loader';

import { setGlobalConfigProp } from '../modules/fonts';

const GlobalConfigPanel = ({ id, config, setGlobalConfigProp }) => {
  const onDirectionChange = useCallback((e) => {
    setGlobalConfigProp('direction', e.target.value);
  }, []);

  const onFontSizeChange = useCallback((e) => {
    setGlobalConfigProp('fontSize', e.target.value);
  }, []);

  const onLineHeightChange = useCallback((e) => {
    setGlobalConfigProp('lineHeight', e.target.value);
  }, []);

  const onSampleTextChange = useCallback((e) => {
    setGlobalConfigProp('text', e.target.value);
  }, []);

  //
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        grid-gap: 1em;
        & > * {
          grid-column: span 1;
        }
      `}
    >
      <div>
        <label htmlFor={`sample_inputText`}>Sample Text</label>
        <textarea
          value={config.text}
          onChange={onSampleTextChange}
          id={`sample_inputText`}
        />
      </div>
      <div>
        <label htmlFor={`config_inputFontSize`}>Font Size</label>
        <input
          id={`cnfig_inputFontSize`}
          type="range"
          min={8}
          max={400}
          step={1}
          value={config.fontSize}
          onChange={onFontSizeChange}
        />
      </div>
      <div>
        <label htmlFor={`config_inputLineHeight`}>Line Height</label>
        <input
          id={`config_inputLineHeight`}
          type="range"
          min={0}
          max={2}
          step={0.01}
          value={config.lineHeight}
          onChange={onLineHeightChange}
        />
      </div>

      <div>
        <label htmlFor={`config_inputDirection`}>Direction</label>
        <select onChange={onDirectionChange} value={config.direction}>
          <option value="ltr">Left-to-Right</option>
          <option value="rtl">Right-to-Left</option>
        </select>
      </div>
      <div>
        <FontLoader />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalConfigProp: (key, value) =>
      dispatch(setGlobalConfigProp(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfigPanel);
