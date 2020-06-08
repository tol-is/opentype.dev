/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useCallback } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FontLoader from './font-loader';

import { setTesterProp } from '../modules/tester';
import TextSampleView from '../ui/text-sample-view';

const TesterHeader = ({ config, setTesterProp }) => {
  const onDirectionChange = useCallback((e) => {
    setTesterProp('direction', e.target.value);
  }, []);

  const onFontSizeChange = useCallback((e) => {
    setTesterProp('fontSize', e.target.value);
  }, []);

  const onLineHeightChange = useCallback((e) => {
    setTesterProp('lineHeight', e.target.value);
  }, []);

  const onSampleTextChange = useCallback((e) => {
    setTesterProp('text', e.target.value);
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
    setTesterProp: (key, value) => dispatch(setTesterProp(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterHeader);
