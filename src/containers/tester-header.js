/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useCallback } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FontLoader from './font-loader';
import Slider from '../ui/input-range';
import { setTesterProp } from '../modules/tester';
import TextSampleView from '../ui/text-sample-view';
import ButtonToggle from '../ui/btn-toggle';

const TesterHeader = ({ tester, setTesterProp }) => {
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
    <header
      css={{
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 100,
        padding: '0 5vw',
        backgroundColor: '#060606',
      }}
    >
      <div
        className={css`
          padding: 0.5rem 0 0 0;
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          grid-auto-rows: minmax(2em, auto);
          grid-gap: 1.5rem;
          width: 100%;
        `}
      >
        <div>
          <FontLoader />
        </div>
        <div>
          <TextSampleView visible={false} />
        </div>
        <div>
          <Slider
            label="Font Size"
            min={12}
            max={128}
            step={1}
            value={tester.fontSize}
            onChange={onFontSizeChange}
          />
        </div>
        <div>
          <Slider
            label="Line Height"
            min={1}
            max={2}
            step={0.01}
            value={tester.lineHeight}
            onChange={onLineHeightChange}
          />
        </div>
      </div>
    </header>
  );
};

function mapStateToProps(state) {
  return {
    tester: state.tester,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTesterProp: (key, value) => dispatch(setTesterProp(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterHeader);
