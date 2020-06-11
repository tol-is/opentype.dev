/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useCallback } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import FontLoader from './font-loader';
import Button from '../ui/btn';
import Slider from '../ui/input-range';
import { setTesterProp } from '../modules/tester';
import TextSampleView from '../ui/text-sample-view';

const TesterHeader = ({ tester, setTesterProp }) => {
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
    <header
      css={{
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: 100,
        padding: '0 5vw',
        backgroundColor: 'white',
      }}
    >
      <div
        className={css`
          padding: 24px 0;
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          grid-auto-rows: minmax(2em, auto);
          grid-gap: 24px;
          width: 100%;
        `}
      >
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
        <div>
          <TextSampleView visible={false} />
        </div>
        <div
          className={css`
            grid-column-start: -2;
            grid-column-span: 1;
          `}
        >
          <FontLoader />
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
