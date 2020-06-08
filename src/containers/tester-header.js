/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useCallback } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FontLoader from './font-loader';

import { setGlobalConfigProp } from '../modules/fonts';
import TextSampleView from '../ui/text-sample-view';

const TesterHeader = ({ config, setGlobalConfigProp }) => {
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
    <header css={{ position: 'fixed', top: '0', width: '100%', zIndex: 100 }}>
      <div>
        <FontLoader />
      </div>
      <div>
        <TextSampleView visible={false} />
      </div>
    </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(TesterHeader);
