import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { css } from 'emotion';

import FontLoader from '../containers/font-loader';

import Slider from '../ui/input-range';
import { setTesterProp } from '../modules/tester';
import TextSamplesView from './text-samples';
import ButtonToggle from '../ui/btn-toggle';

const TesterHeader = ({ tester, setTesterProp, setOpenPanel }) => {
  const [showPanel, setShowPanel] = useState('text');

  useEffect(() => {
    setOpenPanel(showPanel);
  }, [showPanel]);

  const onFontSizeChange = useCallback((e) => {
    setTesterProp('fontSize', e.target.value);
  }, []);

  const onLineHeightChange = useCallback((e) => {
    setTesterProp('lineHeight', e.target.value);
  }, []);

  const onSampleTextChange = useCallback((value) => {
    setTesterProp('text', value);
  }, []);

  const onRightToLeftChange = useCallback((value) => {
    setTesterProp('rtl', value);
  }, []);

  const onToggleTextPanel = useCallback(() => {
    setShowPanel(showPanel === 'text' ? null : 'text');
  }, [showPanel]);

  const hideAllPanels = useCallback(() => {
    // console.log('hide');
    setShowPanel(null);
  }, [showPanel]);

  const showTextPanel = useMemo(() => showPanel === 'text', [showPanel]);

  //
  return (
    <>
      <header
        onMouseLeave={hideAllPanels}
        className={css`
          position: fixed;
          display: block;
          top: 0;
          width: 100%;
          z-index: 100;
          padding: 0 5vw;
          background-color: #060606;
        `}
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
            <ButtonToggle
              selected={showTextPanel}
              aria-expanded={showTextPanel}
              aria-controls={`header-text-samples`}
              onClick={onToggleTextPanel}
              label={'Text Sample'}
            />
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
        <div
          className={css`
            position: absolute;
            width: 100%;
            left: 0;
            top: 100%;
            padding: 0 5vw;
            background-color: #060606;
          }
          `}
        >
          <TextSamplesView
            visible={showTextPanel}
            id={`header-text-samples`}
            tester={tester}
            onTextChange={onSampleTextChange}
            onRtlChange={onRightToLeftChange}
          />
        </div>
      </header>
    </>
  );
};

export default TesterHeader;
